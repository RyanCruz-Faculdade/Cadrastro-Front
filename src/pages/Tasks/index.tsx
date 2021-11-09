import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
 
interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Tasks: React.FC = () => {
 
    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadTasks()
    }, [])
 
    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response);
        setTasks(response.data)
    }
 
    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }
 
    function newTask(){
        history.push('/tarefas_cadastro')
    }
 
    function editTask(id: number){
        history.push(`/tarefas_cadastro/${id}`)
    }
 
    function viewTask(id: number){
        history.push(`/tarefas/${id}`)
    }
 
    async function finishedTask(id: number){
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }
 
    async function deleteTask(id: number){
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }
 
    return (
        
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Cadastro de Alunos</h1>
                <Button variant="dark" size="sm" onClick={newTask}>Novo Cadastro</Button>
            </div>
            <br />
            <Table striped bordered hover variant="dark">       
                 <thead>
                    <tr>
                    <th>N°</th>
                    <th>Nome</th>
                    <th>Data de Atualização</th>
                    <th>Situação</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.updated_at)}</td>
                                <td>{task.finished ? "Aprovado" : "Exame"}</td>
                                <td>
                                    <Button size="sm" disabled={task.finished} variant="light" onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                    <Button size="sm" disabled={task.finished} variant="light" onClick={() => finishedTask(task.id)}>Aprovar</Button>{' '}
                                    <Button size="sm" variant="light" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="light" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Tasks;