export class Result {
  constructor(public etag: string, public kind: string, public nextPageToken: string, public pageInfo: string ,public items: any[]) {}
}
