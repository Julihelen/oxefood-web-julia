import InputMask from 'react-input-mask';
import React,{ useState } from "react";
import MenuSistema from '../../components/MenuSistema'
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormEntregador() {

   const [nome, setNome] = useState();
   const [dataFundacao, setDataFundacao] = useState();
   const [endereco, setEndereco] = useState();
   const [valorMercado, setValorMercado] = useState();
   const [contatoVendedor, setContatoVendedor] = useState();
   const [paginaWeb, setPaginaWeb] = useState();

   function salvar() {

        let clienteRequest = {
            nome: nome,
            dataFundacao: dataFundacao,
            endereco: endereco,
            valorMercado: valorMercado,
            contatoVendedor: contatoVendedor,
            paginaWeb: paginaWeb
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
              <MenuSistema tela={'Entregador'} />

                <div style={{marginTop: '3%'}}>
             
                    <Container textAlign='justified' >
                    <h2> <span style={{color: 'darkgray'}}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                        <Divider />
    
                        <div style={{marginTop: '4%'}}>
    
                            <Form>
    
                                <Form.Group widths='equal'>
    
                                    <Form.Input
                                        required
                                        fluid
                                        label='Nome'
                                        maxLength="100"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
    
                                    />
                                    
                                    <Form.Input
                                        fluid
                                        label='Data Fundação'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
                                            value={dataFundacao}
                                            onChange={e => setDataFundacao(e.target.value)}
                                        /> 
                                    </Form.Input>
                                    
                                </Form.Group>
                                
                                <Form.Input
                                        fluid
                                        label='Endereço'>
                                        <InputMask
                                            required
                                            value={endereco}
                                            onChange={e => setEndereco(e.target.value)}
                                        /> 
                                    </Form.Input>
                                
                                <Form.Group>
    
                                    <Form.Input
                                        fluid
                                        label='Valor de Mercado'
                                        width={6}
                                        maxLength="100"
                                        value={valorMercado}
                                        onChange={e => setValorMercado(e.target.value)}
                                     >
                                    </Form.Input>
                                    
                                    <Form.Input
                                        fluid
                                        label='Contato do Vendedor'
                                        width={13}
                                        maxLength="100"
                                        value={contatoVendedor}
                                        onChange={e => setContatoVendedor(e.target.value)}
                                     >
                                    </Form.Input>
                                    
                                </Form.Group>
                                
                                <Form.Input
                                        fluid
                                        label='Página WEB'
                                        maxLength="100"
                                        value={paginaWeb}
                                        onChange={e => setPaginaWeb(e.target.value)}
                                     ></Form.Input>
                               
                            </Form>
                            
                            <div style={{marginTop: '4%'}}>
    
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    <Link to={'/list-fornecedor'}>Voltar</Link>
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