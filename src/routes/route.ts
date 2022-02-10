import express, {Request, Response} from 'express'
import { Todo } from '../models/todo.model'




const router = express.Router()


// Post API //

router.post('/add', async (req:Request, res:Response)=>{

    const {title, description} = req.body

    const item = Todo.set({title, description})

    await item.save()
    return res.status(200).json({
        data: item,
    })
})


        // Get API //

router.get('/', async (req : Request, res : Response) => {
    
    try{

        const items = await Todo.find({})
        return res.status(200).json({
            data : items,
    
        })
     } catch (error){
         return res.status(500).json({
             error : error,
         })
    }
})


// Get single Item API //

router.get('/:_id', async (req : Request, res: Response)=>{

    try{

        const items = await Todo.findById(req.params._id)

        return res.status(200).json({
            data : items,
        })


    } catch (error) {

        return res.status(500).json({
            error : error

        })

    }
})

// update items API //

router.put('/update', async (req : Request, res: Response)=>{

try{

    const filter = {
        title: req.body.title,
    }

    const update = {
        description: req.body.description,
    }
    
   

        const items = await Todo.updateOne(filter, update, {
            new : true
        });

        return res.status(200).json({
            data : items,
        })
    } catch (error) {

        return res.status(500).json({
            error : error

        })

    }
})

   // Delete items API // 

router.delete('/delete', async (req : Request, res: Response)=>{


    try{
    
        const filter = {
            title: req.body.title,
        }
            const item = await Todo.deleteOne(filter).then((data) => res.json({
                data : "deleted successfully..!!"
            })).catch((e)=>{
                console.log(e)
            })

        } catch (error) {
    
            return res.status(500).json({
                error : error
    
            })
    
        }
    })




export {router}