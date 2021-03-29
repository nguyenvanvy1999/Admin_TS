import App from './app';
import IndexRoute from './routes/index.route';
import AdminRoute from './routes/admin.route';
import UserRoute from './routes/user.route';

const app = new App([UserRoute, IndexRoute, AdminRoute]);

app.listen();
