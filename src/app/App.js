import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
   
    addTask(e){
        console.log(this.state);
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data),
                M.toast({html: 'Tarea actualizada'}),
                this.setState({title: '', description: '', _id: ''}),
                this.fetchTasks()
            })
            .catch(err => console.error(err));

        } else {
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
        }
        
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
        if(confirm('??Est?? seguro de eliminar esta tarea?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then (res => res.json())
            .then (data => {
                console.log(data);
                M.toast({html: 'Tarea Borrada'});
                this.fetchTasks(); 

            });
        }
    }

    editTask(id){
        fetch (`/api/tasks/${id}`)   
        .then (res => res.json())
        .then (data => {
            console.log(`editando tarea ${id}`);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });          
        });
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
                {<h1> Nombre del sitio</h1>}
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' type='text' placeholder='T??tulo de la tarea' onChange={this.handleChange} value = {this.state.title}/>
                                            </div>
                                            <div className='input-field col s12'>
                                                <textarea name = 'description' onChange={this.handleChange} placeholder= 'Descripci??n de la tarea' className='materialize-textarea' value={this.state.description}></textarea>
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
                                        <th>T??tulo</th>
                                        <th>Descripci??n de la tarea</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return <tr key={task._id}>
                                                <td> {task.title} </td>
                                                <td> {task.description}</td>
                                                <td>
                                                    <button className='btn light-blue darkenn-4' onClick= {
                                                            ()=>this.deleteTask(task._id)}>
                                                        <i className='material-icons' >delete</i>
                                                    </button>
                                                    <button onClick = {() => this.editTask(task._id)} className='btn light-blue darken-4' style= {{margin: '4px'}}>
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