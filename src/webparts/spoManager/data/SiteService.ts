import { Text } 								from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } 	from '@microsoft/sp-http';
import { INodeInfo, IListNodeInfo } from '../interfaces/INodeInfo';
import { NODE_TYPE } from '../interfaces/NodeType';
import * as constants from '../utility/Constants';

export class SiteService {

	/***************************************************************************
     * The spHttpClient object used for performing REST calls to SharePoint
     ***************************************************************************/
    private spHttpClient: SPHttpClient;


	/**************************************************************************************************
     * Constructor
     * @param httpClient : The spHttpClient required to perform REST calls against SharePoint
     **************************************************************************************************/
    constructor(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }


	/**************************************************************************************************
	 * Recursively executes the specified search query until all results are fetched
	 * @param webUrl : The web url from which to call the REST API
	 * @param queryParameters : The search query parameters following the "/_api/search/query?" part
	 **************************************************************************************************/
	public getSearchResultsRecursive(webUrl: string, queryParameters: string): Promise<any> {
		return new Promise<any>((resolve,reject) => {
            console.log("in getSearchResultsRecursive");
            console.log(webUrl);
			// Executes the search request for a first time in order to have an idea of the returned rows vs total results
			this.getSearchResults(webUrl, queryParameters)
				.then((results: any) => {
					console.log(results);
					// If there is more rows available...
					let relevantResults = results.PrimaryQueryResult.RelevantResults;
					let initialResults:any[] = relevantResults.Table.Rows;

					if(relevantResults.TotalRowsIncludingDuplicates > relevantResults.RowCount) {

						// Stores and executes all the missing calls in parallel until we have ALL results
						let promises = new Array<Promise<any>>();
						let nbPromises = Math.ceil(relevantResults.TotalRowsIncludingDuplicates / relevantResults.RowCount);

						for(let i = 1; i < nbPromises; i++) {
							let nextStartRow = (i * relevantResults.RowCount);
							promises.push(this.getSearchResults(webUrl, queryParameters, nextStartRow));
						}

						// Once the missing calls are done, concatenates their results to the first request
						Promise.all(promises).then((values) => {
							for(let recursiveResults of values) {
								initialResults = initialResults.concat(recursiveResults.PrimaryQueryResult.RelevantResults.Table.Rows);
							}
							results.PrimaryQueryResult.RelevantResults.Table.Rows = initialResults;
							results.PrimaryQueryResult.RelevantResults.RowCount = initialResults.length;
							resolve(results);
						});
						
					}
					// If no more rows are available
					else {
						resolve(results);
					}
				})
				.catch((error) => {
					reject(error);
				}
			);
		});	
	}

	/**************************************************************************************************
	 * Recursively executes the specified search query using batches of 500 results until all results are fetched
	 * @param webUrl : The web url from which to call the search API
	 * @param queryParameters : The search query parameters following the "/_api/search/query?" part
	 * @param startRow : The row from which the search needs to return the results from
	 **************************************************************************************************/
	public getSearchResults(webUrl: string, queryParameters: string, startRow?: number): Promise<any> {
		return new Promise<any>((resolve,reject) => {
			
			queryParameters = this.ensureSearchQueryParameter(queryParameters, 'StartRow', startRow);
			let endpoint = Text.format("{0}/_api/search/query?{1}", webUrl, queryParameters);

			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					resolve(response.json());
				}
				else {
					reject(response.statusText);
				}
			})
			.catch((error) => { reject(error); }); 
		});	
	}


	/**************************************************************************************************
	 * Recursively searches for all site collections with a path which starts by the specified url
	 * @param startingUrl : The url of the domain from which to find the site collections
	 **************************************************************************************************/
	public getSites(startingUrl: string): Promise<INodeInfo[]> {
		return new Promise<INodeInfo[]>((resolve,reject) => {
			let queryProperties = Text.format("querytext='Path:{0}/* AND contentclass:STS_Site'&selectproperties='Title,Path'&trimduplicates=false&rowLimit=500&Properties='EnableDynamicGroups:true'", startingUrl);
            console.log(queryProperties);
			this.getSearchResultsRecursive(startingUrl, queryProperties)
				.then((results: any) => {
					resolve(this.getPathsFromResults(results));
				})
				.catch((error) => {
					reject(error);
				}
			);
		});	
	}


	/**************************************************************************************************
	 * Recursively searches for all site collections with a path which starts by the specified url
	 * @param siteUrl : The url of the site collection from which to find the webs
	 **************************************************************************************************/
	public getWebsBySiteUrl(siteUrl: string): Promise<INodeInfo[]> {
		return new Promise<INodeInfo[]>((resolve,reject) => {
			let queryProperties = Text.format("querytext='SPSiteUrl:{0} AND (contentclass:STS_Site OR contentclass:STS_Web)'&selectproperties='Title,Path'&trimduplicates=false&rowLimit=500&Properties='EnableDynamicGroups:true'", siteUrl);

			this.getSearchResultsRecursive(siteUrl, queryProperties)
				.then((results: any) => {
					resolve(this.getPathsFromResults(results));
				})
				.catch((error) => {
					reject(error);
				}
			);
		});	
	}

	public expandWeb(webUrl: string): Promise<INodeInfo[]> {
		return new Promise<INodeInfo[]>((resolve, reject) => {
			resolve([
				{
					url: webUrl,
					imageUrl: constants.SITEICONURL,
					title: 'Webs',
					type: NODE_TYPE.WEBS
				},
				{
					url: webUrl,
					imageUrl: constants.SITEICONURL,
					title: 'Lists',
					type: NODE_TYPE.LISTS
				}
			]);
		});
	}

	public fetch_sub_webs(url: string): Promise<INodeInfo[]> {
		const websInfoApi: string = `${url}/_api/site/rootWeb/webinfos`;
		return new Promise<INodeInfo[]>((resolve, rejected) => {
			this.spHttpClient.get(websInfoApi, SPHttpClient.configurations.v1)
			.then((response:SPHttpClientResponse) => {
				response.json().then((responseJSON) => {
					console.log(responseJSON);
					let webInfoNodes: INodeInfo[] = [];
					const webInfoArr = responseJSON.value;
					if(webInfoArr && webInfoArr.length > 0) {
						webInfoArr.forEach(element => {
							webInfoNodes.push({
								title: element.Title,
								url: element.ServerRelativeUrl,  //TODO construct absolute url
								imageUrl: constants.SITEICONURL,
								type: NODE_TYPE.WEB
							});
						});
					}
					resolve(webInfoNodes);
				})				
			})
			.catch((error) => {
				rejected(error);
			})
		})
	}

	public fetch_web_lists(url: string) : Promise<IListNodeInfo[]> {
		const listsInfoApi: string = `${url}/_api/lists`;
		return new Promise<IListNodeInfo[]>((resolve, rejected) => {
			this.spHttpClient.get(listsInfoApi, SPHttpClient.configurations.v1)
			.then((response: SPHttpClientResponse) => {
				response.json().then((responseJSON) => {
					console.log(responseJSON);
					let listInfoNodes: IListNodeInfo[] = [];
					const listInfoarr = responseJSON.value;
					console.log(listInfoarr);
					if(listInfoarr && listInfoarr.length > 0) {
						listInfoarr.forEach(element => {
							listInfoNodes.push({
								title: element.Title,
								url: '',
								type: NODE_TYPE.LIST,
								parentWebUrl: element.ParentWebUrl,
								imageUrl: element.ImageUrl,
								itemCount: element.ItemCount,
								isHidden: element.Hidden
							});
						});
					}
					resolve(listInfoNodes);
				})
			})
			.catch((error) => {
				rejected(error);
			})
		}

		);
	}

	/**************************************************************************************************
	 * Recursively executes the specified search query using batches of 500 results until all results are fetched
	 * @param queryParameters : The search query parameters following the "/_api/search/query?" part
	 * @param parameterName : The name of the parameter that needs to be ensured
	 * @param parameterValue : The value of the parameter that needs to be ensured
	 **************************************************************************************************/
	private ensureSearchQueryParameter(queryParameters: string, parameterName: string, parameterValue: any): string {
		if(parameterValue) {
			let strParameter = Text.format("{0}={1}", parameterName, parameterValue);
			queryParameters = queryParameters.replace(new RegExp('StartRow=\\d*', 'gi'), strParameter);

			if(queryParameters.toLowerCase().indexOf(parameterName) < 0) {
				queryParameters += ('&' + strParameter);
			}
		}
		return queryParameters;
	}


	/**************************************************************************************************
	 * Gets the paths out of the specified search results
	 * @param results : The url of the domain from which to find the site collections
	 **************************************************************************************************/
	private getPathsFromResults(results: any): INodeInfo[] {
		let webBasicInfo:INodeInfo[] = [];
		let pathIndex = null;
		let titleIndex = null
        console.log('in getPathsFromResults');
        console.log(results);
		for(let result of  results.PrimaryQueryResult.RelevantResults.Table.Rows) {
			// Stores the index of the "Path" cell on the first loop in order to avoid finding the cell on every loop
			if(!pathIndex) {
				let pathCell = result.Cells.filter((cell) => { return cell.Key == "Path"; })[0]; //get Site Collection's Path, UrlZone, Culture
				pathIndex = result.Cells.indexOf(pathCell);
			}

			if(!titleIndex) {
				let titleCell = result.Cells.filter((cell) => { return cell.Key == "Title"; })[0]; //get Site Collection's Title, UrlZone, Culture
				titleIndex = result.Cells.indexOf(titleCell);
			}

			webBasicInfo.push({
				url: result.Cells[pathIndex].Value.toLowerCase().trim(), 
				title:result.Cells[titleIndex].Value.toLowerCase().trim(),
				imageUrl: constants.SITEICONURL
			});
		}
		return webBasicInfo;
	}
}
