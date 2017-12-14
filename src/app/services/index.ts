import guards from "./guards";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./user/user.service";
import {CategoryService} from "./category/category.service";
import {ArticleService} from "./article/article.service";

let services: any[] = [
    guards,
    AuthService,
    UserService,
    CategoryService,
    ArticleService
];
export default services
