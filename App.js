const fs = require('fs')
const yargs = require ('yargs');
const chalk = require ('chalk');

function loadData(){
    try{
    const buffer = fs.readFileSync("data.json") // read file to buffer/binary  data
    const data = buffer.toString()
    const dataObj = JSON.parse(data) // stringify it
    // console.log(JSON.parse(data)) //convert json into js object
    return dataObj
} catch (err){
    return []
}

}

function saveData(data){
    fs.writeFileSync("data.json", JSON.stringify(data))

}

function addTodo(todo, complete){
    const data = loadData()
    const newTodo = {todo: todo, complete: complete} // if the same, can skip it 
    data.push(newTodo)
    saveData(data)
}

function toggleList(id){
    const data = loadData()
    data.forEach((item,idx)=>{
        if (idx === id) {
            console.log("hehehe")
            item.complete = item.complete? false : true
            
        }
    })
    console.log(data)
    saveData(data)
}

function deleteTodo(id){
    const data = loadData()
    data.splice(id,1)
    saveData(data)
}

function deleteAll(){
   console.log("                                       88        ") 
   console.log(" ,d                                    88           ")
   console.log(" 88                                    88           ")
   console.log("MM88MMM 8b,dPPYba, ,adPPYYba, ,adPPYba,88,dPPYba,   ")
   console.log("  88    88P'   ''Y8       `Y8 I8[     88P'    8a  ")
   console.log("  88    88         ,adPPPPP88  `Y8ba,  88      88 ")
   console.log("  88,   88         88,    ,88 aa    ]8I88      88 ")
   console.log("  Y888  88         8bbdP  Y8 ` aYbbdP' 88      88  ")


   saveData([])
}
// if(process.argv[2] === "list"){
//     console.log("Listing Todo")
//     constdata = loadData()
//     data.forEach(({todo, status})=> console.log(`
//     todo: ${todo}
//     status: ${status}`))
// }  else if (process.argv[2] === "add"){
//     console.log("Adding Todo")
//     let todo = process.argv[3] || null
//     let status = process.argv[4] ||  false
//     if (todo){
//         console.log(" Add something to your todo list")
//         addTodo(todo,status)
//     } else {
//         console.log("Please write something")
//     }
   
// }else {
//     console.log("Cannot understand your command")
// }
// to add a new todo
// a ocmmand to receive the info: todo's body, status
// a function to save the data 
// a  function  to modidy data (adding object to the existing array)

yargs.command({
    command: "list",
    describe: "listing all todos",
    builder:{
        complete:{
            describe: "is it done or not",
            type: "string",
            alias: "s",
            default: "all" ,
        }
    },
    handler: function(args){
        console.log(chalk.black.bgRed.bold("Listing all todos"))
        let data = loadData()
        // console.log(args)
        if (args.complete === "complete"){
            console.log("aaaa")
            data = data.filter(item => item.complete === true)

        } else if (args.complete === "incomplete"){
            data = data.filter(item => item.complete === false)

        } else if (args.complete === "all"){
            data = data
        }
        data.forEach(({todo, complete},idx)=> console.log(`
        idx: ${idx}
        todo: ${todo}
        complete: ${complete}`))
    }
})


yargs.command({
    command :"add",
    describe: "adding new todo",
    builder:{
        todo:{
            describe: "todo content",
            demandOption: true,
            type: "string",
            alias: "t"
        
        },
        complete:{
            describe: "is it done or not",
            demandOption: false, //default is false
            type: "boolean",
            alias: "s",
            default: false 
        }

    },
    handler: function({todo, complete}){
        addTodo(todo, complete)
        console.log(chalk.keyword('orange').bgBlue.bold("Finished adding your todo list"))

    }

})

yargs.command({
    command: "show-complete",
    describe: "Show complete list",
    handler: function({}){
        loadData()
        let data = loadData()
        data.filter(item => {
            if (item.complete === true){
                console.log(item)
                return true
            } else {
                return false
            }

        })
    }
   
})

yargs.command({
    command: "delete",
    descibe: "delete list with id",
    builder:{
       id:{
           type: "int",
           demandOption: false,
           alias: "s"
       }
    },
    handler: function({id}){
        if (id){
            deleteTodo(id)
        } else {
            deleteAll()
        }
       
        console.log(chalk.black.bgGreenBright.bold("Finished deleting your todo list"))

    }

})

yargs.command({
    command: "toggle",
    describe: "toggle the status",
    builder:{
        id:{
            type: "int",
            demandOption: false,
            alias: "s"
        }

    },
    handler: function({id}){
        toggleList(id)
    }

})

yargs.parse () //to execute all the commands