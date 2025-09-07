import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'
import { connect} from './database/postgres'

const app = createApp()

showRoutes(app)
connect()
export default app
