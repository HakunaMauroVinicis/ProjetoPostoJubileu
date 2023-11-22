// server.js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const moment = require('moment');
const dbOperations = require('./dbOperations');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Configuração do EJS como mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota principal
app.get('/', (req, res) => {
    res.render('layout', {
        body: '<h2>Bem-vindo ao Posto do Jubileu</h2><p>Onde Tem de tudo menos gasolina</p><img src="/img/jubileu.jpeg" alt="jubileu">'
    });
});

//cadastrofuncionario
app.get('/cadastroFuncionario', (req, res) => {
    dbOperations.obterFuncionarios((err, result) => {
        if (err) throw err;
        result.forEach(funcionario => {
            funcionario.dataAdmissao = moment(funcionario.dataAdmissao).format('DD/MM/YYYY')
        });
        // Verifique se há um parâmetro de ID na URL
        const idProfissional = req.query.id;
        if (idProfissional) {
            // Se houver um ID, recupere os detalhes do funcionário
            dbOperations.obterFuncionarioPorId(idProfissional, (err, funcionario) => {
                if (err) throw err;
                // Renderize o formulário de edição diretamente no cadastroFuncionario.ejs
                res.render('cadastroFuncionario', { funcionarios: result, funcionario });
            });
        } else {
            // Se não houver ID, apenas renderize o cadastroFuncionario.ejs normalmente
            res.render('cadastroFuncionario', { funcionarios: result });
        }
    });
});

{// Rota para processar o formulário de cadastro de funcionário
app.post('/salvarFuncionario', (req, res) => {
const { nome, dataAdmissao } = req.body;

dbOperations.inserirFuncionario(nome, dataAdmissao, (err, result) => {
    if (err) {
        console.error('Erro ao inserir funcionário:', err);
        res.send('<script>alert("Erro ao salvar funcionário no banco de dados"); window.history.back();</script>');
    } else {
        console.log('Funcionário inserido com sucesso');
        res.redirect('/cadastroFuncionario');
    }
});
});
// Rota para a página de consulta de funcionários
app.get('/consultarFuncionarios', (req, res) => {
dbOperations.obterFuncionarios((err, result) => {
    if (err) throw err;
    res.render('consultarFuncionarios', { funcionarios: result });
});
});
// Rota para a página de edição de funcionário
app.get('/editarFuncionario/:id', (req, res) => {
const idProfissional = req.params.id;
// Recupere os detalhes do funcionário com base no ID e passe para a página de edição
// Implemente a função obterFuncionarioPorId em dbOperations.js
dbOperations.obterFuncionarioPorId(idProfissional, (err, funcionario) => {
    if (err) throw err;
    res.render('editarFuncionario', { funcionario });
});
});
app.get('/obterFuncionarioPorId/:id', (req, res) => {
const idProfissional = req.params.id;
dbOperations.obterFuncionarioPorId(idProfissional, (err, funcionario) => {
    if (err) {
        console.error('Erro ao obter funcionário por ID:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
        res.json(funcionario);
    }
});
});
// Rota para processar a atualização dos dados do funcionário
app.post('/atualizarDadosFuncionario/:id', (req, res) => {
console.log(req.body); // Adicione esta linha
const idProfissional = req.params.id;
const { nome, dataAdmissao } = req.body;

dbOperations.atualizarFuncionario(idProfissional, nome, dataAdmissao, (err, result) => {
    if (err) {
        console.error('Erro ao atualizar funcionário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
        res.json({ success: true });
    }
});
});

// cadastro Produto
app.get('/cadastroProduto', (req, res) => {
res.render('cadastroProduto');
});

app.post('/savarProduto', (req, res) => {
const { nomeProd, descricao, quantidade, preco } = req.body;

dbOperations.inserirProdutos(nomeProd, descricao, quantidade, preco, (err, result) => {
    if (err) {
        console.error('Erro ao inserir produto: ', err);
    } else {
        console.log('Produto inserido com sucesso');
        res.redirect('/cadastroProduto')
    }
});
});

// Rota para a página de agendamento
app.get('/agendamentoTrocaOleo', (req, res) => {
dbOperations.obterAgendamentos((err, result) => {
    if (err) throw err;

    const eventos = result.map(agendamento => ({
        title: agendamento.ServicoAgenda || 'Agendamento',
        start: moment(agendamento.DataAgenda).format('DD-MM-YYY') + ' ' + moment(agendamento.HoraAgenda).format('HH:mm:ss'),
        allDay: false // Se for durante todo o dia, ajuste para true
    }));

    res.render('agendamentoTrocaOleo', { eventos });
});
});
// Rota para processar o formulário de agendamento
app.post('/agendar', (req, res) => {
const { dataAgendamento, horaAgendamento, idCliente, idProfissional, servicoAgenda } = req.body;

dbOperations.inserirAgendamento(dataAgendamento, horaAgendamento, idCliente, idProfissional, servicoAgenda, (err, result) => {
    if (err) throw err;
    res.redirect('/agendamentoTrocaOleo');
});
});

// Rota para a página de verificar pedidos
app.get('/consultarPedidos', (req, res) => {
res.render('consultarPedidos');
});}

// Rota para pagina de verificar cliente
app.get('/cadastroCliente', (req, res) => {
    dbOperations.obterClientes((err, result) => {
        const idCliente = req.query.id;
        if (idCliente) {
            dbOperations.obterClientePorId(idCliente, (err, cliente) => {
                if (err) throw err;
                res.render('cadastroCliente', { clientes: result, cliente });
            });
        } else {
            res.render('cadastroCliente', { clientes: result });
        }
    });
});
app.post('/salvarCliente', (req, res) => {
    const { nomeCliente, emailCliente, telefoneCliente } = req.body;

    dbOperations.inserirCliente(nomeCliente, emailCliente, telefoneCliente, (err, result) => {
        if (err) {
            console.error('Erro ao inserir cliente:', err);
            res.send('<script>alert("Erro ao salvar cliente no banco de dados"); window.history.back();</script>');
        } else {
            console.log('Cliente inserido com sucesso');
            res.redirect('/cadastroCliente');
        }
    });
});
app.get('/consultarClientes', (req, res) => {
    dbOperations.obterCliente((err, result) => {
        if (err) throw err;
        res.render('consultarClientes', { clientes: result });
    });
});
app.get('/editarCliente/:id', (req, res) => {
    const idCliente = req.params.id;
    dbOperations.obterClientePorId(idCliente, (err, cliente) => {
        if (err) throw err;
        res.render('editarCliente', { cliente });
    });
});
app.get('/editarCliente/:id', (req, res) => {
    const idCliente = req.params.id;
    dbOperations.editarCliente(idCliente, (err, cliente) => {
        if (err) {
            console.error('Erro ao obter cliente por ID:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json(cliente);
        }
    });
});
app.get('/obterClientePorId/:id', (req, res) => {
    const idCliente = req.params.id;
    dbOperations.obterClientePorId(idCliente, (err, funcionario) => {
        if (err) {
            console.error('Erro ao obter cliente por ID:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json(cliente);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
