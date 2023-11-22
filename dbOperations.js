// dbOperations.js
const { query } = require('express');
const db = require('./dbConfig');

module.exports = {
    inserirFuncionario: (nome, dataAdmissao, callback) => {
        const query = 'INSERT INTO profissional (NomeProfissional, dataAdmissao) VALUES (?, ?)';
        db.query(query, [nome, dataAdmissao], callback);
    },
    
    obterFuncionarios: (callback) => {
        const query = 'SELECT * FROM profissional';
        db.query(query, callback);
    },

    obterFuncionarioPorId: (idProfissional, callback) => {
        const query = 'SELECT * FROM profissional WHERE idProfissional = ?';
        db.query(query, [idProfissional], (err, result) => {
            if (err) {
                console.error('Erro ao obter funcionário por ID:', err);
                return callback(err, null);
            }

            if (result.length === 0) {
                console.error('Funcionário não encontrado');
                return callback('Funcionário não encontrado', null);
            }

            console.log('Dados de funcionário obtidos com sucesso');
            callback(null, result[0]);
        });
    },

    atualizarFuncionario: (idProfissional, nome, dataAdmissao, callback) => {
        const query = 'UPDATE profissional SET NomeProfissional = ?, dataAdmissao = ? WHERE idProfissional = ?';
        db.query(query, [nome, dataAdmissao, idProfissional], callback);
    },
  
    inserirProdutos: (nomeProd, descricao, quantidade, preco, callback) => {
        const query = 'INSERT INTO produtos (NomeProduto, descricao, saldoproduto, precoproduto) VALUES (?, ?, ?, ?)';
        db.query(query, [nomeProd, descricao, quantidade, preco], callback);
    },

    obterAgendamentos: (callback) => {
        const query = 'SELECT * FROM agenda';
        db.query(query, callback);
    },
    
    inserirAgendamento: (dataAgendamento, horaAgendamento, idCliente, idProfissional, servicoAgenda, callback) => {
        const query = 'INSERT INTO agenda (DataAgenda, HoraAgenda, Clientes_idCliente, Profissional_IdProfissional, ServicoAgenda) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [dataAgendamento, horaAgendamento, idCliente, idProfissional, servicoAgenda], callback);
    },

    inserirCliente: (nome, email, telefone, callback) => {
        const query = 'INSERT INTO cliente (CliNome, emailCliente, telefoneCliente) VALUES (?, ?, ?)';
        db.query(query, [nome, email, telefone], callback);
    },

    obterClientes: (callback) => {
        const query = 'SELECT * FROM profissional';
        db.query(query, callback);
    },

    obterClientePorId: (idCliente, callback) => {
        const query = 'SELECT * FROM cliente WHERE idCliente = ?';
        db.query(query, [idCliente], (err, result) => {
            if (err) {
                console.error('Erro ao obter cliente por ID:', err);
                return callback(err, null);
            }

            if (result.length === 0) {
                console.error('Cliente não encontrado');
                return callback('Cliente não encontrado', null);
            }

            console.log('Dados de Cliente obtidos com sucesso');
            callback(null, result[0]);
        });
    },

};
