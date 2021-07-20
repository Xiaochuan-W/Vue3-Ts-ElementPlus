export interface Product{
  topic:string,
  no:string;
  producer:string;
  date:string;
  location:string;
  type?:string;
  batch?:number|null;
  total?:number|null;
  phone?:string;
}