import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'
import * as db from './database/index'

const app = createApp()

showRoutes(app)
db.connect()
export default app
