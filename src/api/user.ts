import request from "./request";

/**
 * https://learn.microsoft.com/zh-cn/graph/api/resources/user?view=graph-rest-1.0#properties
 */
export interface User {
	/** 用户的用户主体名称 (UPN) */
	userPrincipalName?: string;
	/** 用户的唯一标识符 */
	id?: string;
	/** 用户通讯簿中显示的名称 */
	displayName?: string;
	/** 用户的姓氏 */
	surname?: string;
	/** 用户的名 */
	givenName?: string;
	/** 用户的首选语言 */
	preferredLanguage?: string;
	/** 用户的 SMTP 地址 */
	mail?: string;
	/** 用户的主要移动电话号码 */
	mobilePhone?: string;
	/** 用户的职务 */
	jobTitle?: string;
	/** 用户公司地点的办公室位置 */
	officeLocation?: string;
	/** 用户的电话号码 */
	businessPhones?: string[];
}

export const getUser = () => request.get<User>("/me");
