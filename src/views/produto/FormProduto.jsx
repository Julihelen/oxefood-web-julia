import InputMask from 'react-input-mask';
import React,{ useState } from "react";
import MenuSistema from '../../components/MenuSistema'
import axios from 'axios'; 
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';


export default function FormCliente() {

    const [titulo, setTitulo] = useState();
    const [tempo, setTempo] = useState();
    const [tempoMin, setTempoMin] = useState();

    function salvar() {

        let clienteRequest = {
            titulo: titulo,
            tempo: tempo,
            tempoMin: tempoMin
        }

        axios.post("http://localhost:8080/api/cliente", clienteRequest)
        .then((response) => {
            console.log('Cliente cadastrado com sucesso.')
        })
        .catch((error) => {
            console.log('Erro ao incluir o um cliente.')
        })
    }

    return (

        <div>
        <MenuSistema tela={'Produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                    placeholder=""
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Codigo do Produto'>
                                </Form.Input>



                                <Form.Input
                                    fluid
                                    label='Valor unitário'
                                    width={6}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    width={6}>
                                    <InputMask
                                        placeholder="30"
                                        value={tempo}
                                        onChange={e => setTempo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    width={6}
                                >
                                    <InputMask
                                        placeholder="40"
                                        value={tempoMin}
                                        onChange={e => setTempoMin(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>
                        </Form>
                            <div style={{ marginTop: '4%' }}>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>

                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='blue'
                                    floated='right'
                                    onClick={salvar} 
                                >
                                    <Icon name='save' />
                                    Salvar
                                </Button>

                            </div>
                        
                    </div>

                </Container>
            </div>
        </div>

    );

}