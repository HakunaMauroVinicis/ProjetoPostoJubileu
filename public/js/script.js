{
    function editarFuncionario(idProfissional) {
        // Aqui você pode preencher os campos do modal com os dados do funcionário usando JavaScript
        const funcionario = obterDadosFuncionario(idProfissional);
    
        // Preencher os campos do modal
        document.getElementById('idProfissionalEdit').value = funcionario.idProfissional;
        document.getElementById('nomeEdit').value = funcionario.NomeProfissional;
        document.getElementById('dataAdmissaoEdit').value = funcionario.dataAdmissao;
    
        // Exibir o modal
        const modal = document.getElementById('modalEditar');
        modal.style.display = 'block';
    }
    
    function salvarEdicao() {
        console.log('Botão "Salvar Edição" clicado');
        const idProfissional = document.getElementById('idProfissionalEdit').value;
        const nome = document.getElementById('nomeEdit').value;
        const dataAdmissao = document.getElementById('dataAdmissaoEdit').value;
    
        fetch(`/atualizarFuncionario/${idProfissional}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, dataAdmissao })
        })
        .then(response => response.json())
        .then(data => {
            fecharModal();
            location.reload(); // Recarregar a página ou atualizar a tabela
        })
        .catch(error => console.error('Erro ao salvar edição:', error));
    }
    
    
    // Função de exemplo para obter dados do funcionário pelo ID
    function obterDadosFuncionario(idProfissional) {
        // Fazer uma solicitação AJAX para obter os dados do funcionário do servidor
        fetch(`/obterFuncionarioPorId/${idProfissional}`)
            .then(response => response.json())
            .then(data => {
                // Preencher os campos do modal com os dados obtidos
                document.getElementById('idProfissionalEdit').value = data.idProfissional;
                document.getElementById('nomeEdit').value = data.NomeProfissional;
                document.getElementById('dataAdmissaoEdit').value = data.dataAdmissao;
    
                // Exibir o modal
                const modal = document.getElementById('modalEditar');
                modal.style.display = 'block';
            })
            .catch(error => console.error('Erro ao obter dados do funcionário:', error));
    }
    
    function fecharModal() {
        // Limpar os campos do modal
        document.getElementById('idProfissionalEdit').value = '';
        document.getElementById('nomeEdit').value = '';
        document.getElementById('dataAdmissaoEdit').value = '';
    
        // Fechar o modal
        const modal = document.getElementById('modalEditar');
        modal.style.display = 'none';
    }
}
