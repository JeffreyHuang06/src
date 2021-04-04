import React, { useEffect, useState} from 'react';
import firebase from '../firebase/firebase.js';
function List() {
    const [todos, setTodos] = useState([])
    const [button_value, button_value_State] = useState("Enter")



    useEffect( () => {
        getData()
    }, [])
    const getData = () => {
        firebase.db.collection('reports').get()
          .then(querySnapshot => {
          querySnapshot.forEach( doc => {
  
            setTodos(prev => ([...prev, doc.data()]))
          })
        })
        .catch(err => {
          console.log(err.message)
        })
      }
      function search() {
        const input = document.getElementById("search").value;
        setTodos(todos.filter(({city}) => city.toLowerCase().includes(input.toLowerCase())));
        button_value_State("clear")
        document.getElementById("button-addon2").onclick = clear
        
      }
      
      function clear() {
          document.location.reload(true);
      }





    return( 
        <div>
            <center>

                <div style = {{margin: 10}}>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search by City, State, Type, Description, or Date" id = "search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-outline-primary" onClick = {search} type="submit" id="button-addon2">{button_value}</button>
                    </div>
                </div>



                <div class = "row card-group">
                    {
                        todos.map((items) => 
                            <div class = "col-6">
                                <div style = {{margin: 10}}>
                                    <div class="card text-center">
                                        <div class="card-header">
                                            {items.date}
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">{items.city}, {items.state}</h5>
                                            <p class="card-text">{items.description}</p>
                                        </div>
                                        <div class="card-footer text-muted">
                                            {items.type}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                 
                </div>
            </center>
        </div>
    );
}
export default List;