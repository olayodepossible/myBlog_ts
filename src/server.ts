import express, {Request, Response} from 'express';

class Server {

    private app : express.Application;

    constructor() {
        this.app = express(); //init the app
        this.configuration();
        this.routes();
    }

   
  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5444,
      username: "postgres",
      password: "1234",
      database: "blogDB",
      entities: ["dist/database/entities/**/*.js"],
      synchronize: true,
      name: "blog"
    });

    this.postController = new PostController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Hello world!" );
    });

    this.app.use(`/api/posts/`,this.postController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening on port: ${this.app.get('port')}`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server