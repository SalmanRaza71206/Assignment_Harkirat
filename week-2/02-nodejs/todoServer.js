/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const fs = require('fs')

  app.use(bodyParser.json());

  // GET all the todos
  app.get('/todos',(req,res)=>{
    fs.readFile('todos.json','utf-8',(err,data)=>{
      if(err){
        res.status(404).send('file not found')
      }
      else{
        res.status(200).json({data})
      }
    })
  })
  //Get todo by id
  app.get('/todos/:id',(req,res)=>{
    const todo_id = req.params.id 
    fs.readFile('todos.json','utf-8',(err,data)=>{
      if(err){
        res.status(404).send('file not found')
      }
      else{
        let todo = data.filter((each_todo)=>{
              if(todo_id === each_todo.id){
                 return each_todo
              }

         })
         if(todo.length){
          res.status(200).json({todo})
         }
         else{
          res.status(404).json("Not found")
         }
      }
    })
  })

  //Create a todo
  app.post('/todos', (req,res)=>{
    const newData = req.body
    fs.readFile('todos.json','utf-8',(err,data)=>{
        if(err){
            res.status(404).send("File not Found")
        }
        else{
            // console.log(data)
           const old_data = JSON.parse(data)
           newData['id'] = old_data.length + 1;
            old_data.push(newData)
            
            
            fs.writeFile('todos.json', JSON.stringify(old_data), 'utf-8', (err) => {
                if (err) {
                   res.send(404).send("Not able to add in new todo")
                } else {
                    res.status(201).send("Todo added successfully")
                }
            });

        }
    })
    
  })

  //update todo
  app.put("/todos/:id", (req,res)=>{
    const id = req.params.id
   
    
    fs.readFile('todos.json','utf-8',(err,data)=>{
      if(err){
        res.status(404).send("File not found")
      }
      else{
        const oldData = JSON.parse(data)
       const updatedData = oldData.map((todo)=>{
            if(todo.id == id){
                const newtodo ={...todo,...req.body}
                // console.log(newtodo,"new")
                return newtodo
            }
            else{
                return todo;
            }
        })
     
        fs.writeFile('todos.json', JSON.stringify(updatedData), 'utf-8', (err) => {
            if (err) {
               res.send(404).send("Not able to add in new todo")
            } else {
                res.status(201).send("Todo updated successfully")
            }
        });
      }
    })
  })
  
  // delete the todo

  app.delete("/todos/:id",(req,res)=>{
    const id = req.params.id
    fs.readFile('todos.json','utf-8',(err,data)=>{
        if(err){
          res.status(404).send('file not found')
        }
        else{
            const oldData = JSON.parse(data) 
            const RestData = oldData.filter((todo)=>{
                if(todo.id != id){
                    return todo;
                    
                }
             })
           
             fs.writeFile('todos.json', JSON.stringify(RestData), 'utf-8', (err) => {
                if (err) {
                   res.send(404).send("Not able to add in new todo")
                } else {
                    res.status(201).send("Todo deleted successfully")
                }
            });
        }
      })

  })

  
  module.exports = app;