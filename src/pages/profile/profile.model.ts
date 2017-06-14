export class UserModel {
  id: number = 0;
  client_id: number =0;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  job_title: string;
  role: string;
  phone: string;
  bio: string;
  country: string;
  birthday: string;
  gender: string;
  shared_user: string;
  first_login: string;
  active: string;
  admin: string;
  backend: string;
  crypted_password: string;
  password_salt: string;
  persistence_token: string;
  single_access_token: string;
  perishable_token: string;
  login_count: number;
  failed_login_count: number = 0;
  last_request_at: string;
  current_login_at: string;
  last_login_at: string;
  current_login_ip: string;
  last_login_ip: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  about: string;
  location: string;
}

export class ProfilePostModel {
    date: Date;
	image: string;
	description: string;
	likes: number = 0;
	comments: number = 0;
	liked: boolean = false;
}

export class ProfileModel {
  user: UserModel = new UserModel();
  following: Array<UserModel> = [];
  followers: Array<UserModel> = [];
  posts: Array<ProfilePostModel> = [];
}
