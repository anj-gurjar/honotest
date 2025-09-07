import * as postrges from './postgres/index'


export const connect=async()=>{
    await Promise.all([
        postrges.connect()
    ])
}
export const disconenct=async()=>{
    await Promise.all([
        postrges.disconnect()
    ])

}