import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: ''
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
            .then(data => console.log(data))
            .catch(err => console.error(err));
        
        e.preventDefault();
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
                <h2> Chuililis</h2>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' type='text' placeholder='Título de la tarea' onChange={this.handleChange}/>
                                            </div>
                                            <div className='input-field col s12'>
                                                <textarea name = 'description' onChange={this.handleChange} placeholder= 'Descripción de la terea' className='materialize-textarea'></textarea>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;