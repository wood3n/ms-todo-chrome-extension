export interface CommonQueryParams {
  /** 返回数据的条数,https://learn.microsoft.com/zh-cn/graph/query-parameters?tabs=http#top-parameter */
  $top?: number;
  /** 高级查询数据: https://learn.microsoft.com/zh-cn/graph/filter-query-parameter?tabs=http */
  $filter?: string;
}
