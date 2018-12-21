import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListaContainer extends React.Component {
constructor(){
    super();
    this.state = {
        tarefas: [],
        inputTarefa: " "
    };

    this.addTarefa = (evento) => {
        evento.preventDefault();
        const tarefas = this.state.tarefas.slice();
        tarefas.push(this.state.inputTarefa);
        this.setState({
            tarefas: tarefas,
            inputTarefa: " "
        });
    };

    this.editTarefa = (index, valor) => {
        const tarefas  = this.state.tarefas.slice();
        tarefas[index] = valor;
        this.setState({tarefas});
    }

    this.removeTarefa = (index) => {
        const tarefas = this.state.tarefas.slice();
        tarefas.splice(index, 1);
        this.setState({tarefas});
    };

    this.onChange = (evento) => {
        evento.preventDefault();
        const state = Object.assign({},this.state);
        state[evento.target.name] = evento.target.value;
        this.setState(state);
    };
 }

 render(){
     return(
        <ListaView 
            tarefas={this.state.tarefas}
            inputTarefa={this.state.inputTarefa}
            onChange={this.onChange}
            addTarefa={this.addTarefa} 
            removeTarefa={this.removeTarefa}
            editTarefa={this.editTarefa} />
     );
 }

}

const ListaView = (props) => (
    <div>
        <h1>Lista de Tarefas</h1>
        <input name="inputTarefa" value={props.inputTarefa} onChange={props.onChange} />
        <button onClick={props.addTarefa}>Add</button>
        {
          props.tarefas.map((tarefa,index) => (
            <ListaViewItem
                tarefa={tarefa}
                index={index}
                removeTarefa={props.removeTarefa}
                editTarefa={props.editTarefa} />
          ))
     }
    </div>
);

class ListaViewItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            edit: false,
            texto: props.tarefa
        }

        this.removeTarefa = () => {
            this.props.removeTarefa(this.props.index);
        }

        this.editTarefa = () => {
            this.props.editTarefa(this.props.index, this.state.texto);
            this.setState({edit: false});
        }

        this.abrirForm = () => {
            this.setState({edit: true});
        }

        this.fecharForm = () => {
            this.setState({edit: false});
        }

        this.onChange = (ev) => {
            this.setState({texto: ev.target.value});
        }
    }

    render() {
        if(this.state.edit){
            return(
                <p>
                    {this.props.index+1} - {this.props.tarefa} -
                    <span style={{cursor:"pointer"}} onClick={this.abrirForm}>Alterar</span>
                    <span style={{cursor:"pointer"}} onClick={this.removeTarefa}>excluir</span>
                </p>
            );
        }

        return(
            <div>
                {this.props.index+1} <input value={this.state.texto} onChange={this.onChange} />
                <span style={{cursor:'pointer'}} onClick={this.editTarefa}>Salvar</span>
                <span style={{cursor:"pointer"}} onClick={this.fecharForm}>Cancelar</span>
            </div>
        );

    }

};

ReactDOM.render(
    <ListaContainer />,
     document.getElementById('root'));
