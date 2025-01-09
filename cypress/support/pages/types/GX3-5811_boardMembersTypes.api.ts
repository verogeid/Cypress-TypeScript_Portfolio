import { type Auth } from '@helper/types/AuthenticateTypes.api';

interface Get {
	userIdMember: string;
	membersBoard: string;
	memberData: string;
}

interface Post {
	board: string;
}

interface Put {
	memberToBoard: string;
}

interface Delete {
	board: string;
}

interface Url {
	protocol: string;
	host: string;
	basePath: string;
	endPath: string;
	get: Get;
	post: Post;
	put: Put;
	delete: Delete;
}

interface Data {
	idUser: string;
	idOrganization: string;
	username: string;
	idBoard: string;
	boardName: string;
}

export interface UserData {
	auth: Auth;
	data: Data;
	url: Url;
}

export interface ApiResponse {
	id: string;
}
