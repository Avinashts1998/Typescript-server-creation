import mongoose from 'mongoose'

interface TodoI{
    title: String,
    description: String,
}

interface TodoDocuemnt extends mongoose.Document{
    
    title: String,
    description: String,

}

const todoSchema = new mongoose.Schema({

    title : {
        type:String,
        required: true
    },
    description : {
        type:String,
        required: false
    },
})

interface todoModelInterface extends mongoose.Model<TodoDocuemnt>{
    set(x: TodoI) : TodoDocuemnt;
}


todoSchema.statics.set = (x:TodoI) => {
    return new Todo(x)
}

const Todo = mongoose.model<TodoDocuemnt, todoModelInterface>(
    "Todo",
    todoSchema );

Todo.set({
    title:"some title",
    description : "some description"
});


export {Todo}
