import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
   
    addTask(e){
        //console.log(this.state);
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Creada'});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })    
            .catch(err => console.error(err));
        
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then (res => res.json())
            .then (data => {
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    deleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (res => res.json())
        .then (data => console.log(data));
        this.fetchTasks(); 
    }

    handleChange(e){
        const {name, value}= e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/*NAVIGATION*/}
                <nav className='light-blue darken-2'> Testing the component
                    <div className='container'>
                        <a className='brand-logo' href='/'>
                            MERN - STACK
                        </a>
                    </div>
                </nav>
                {<h2> Chuililis</h2>}
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' type='text' placeholder='Título de la tarea' onChange={this.handleChange} value = {this.state.title}/>
                                            </div>
                                            <div className='input-field col s12'>
                                                <textarea name = 'description' onChange={this.handleChange} placeholder= 'Descripción de la terea' className='materialize-textarea' value={this.state.description}></textarea>
                                            </div>
                                            <button className='btn light-blue darken-2' type='submit'>
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>title</th>
                                        <th>description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return <tr key={task._id}>
                                                <td> {task.title} </td>
                                                <td> {task.description}</td>
                                                <td>
                                                    <button>
                                                        <i className='material-icons' onClick= {
                                                            ()=>this.deleteTask(task._id)}>delete</i>
                                                    </button>
                                                    <button>
                                                        <i className='material-icons'>edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;