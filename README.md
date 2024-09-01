# PROJETO XSHOP BOOKS

## RESUMO DO PROJETO

__XShop Books__ é um projeto para o meu portfolio freelancer com o objetivo de demonstrar maior parte das minhas capacidades como desenvolvedor fullstack com um foco maior no backend, o projeto simula uma loja online de livros onde pode se registrar usuários compradores e usuários administradores, os administradores tem acesso as vendas, livros e muito mais, e os compradores podem simular compras, salvar livros em seus favoritos, e muito mais, tudo isso acontece em um banco de dados real, com dados reais que podem ser manipulados por qualquer pessoa com uma conta seja administrativa ou de comprador.

LINK DO SITE: [XShop Books Project](https://www.xshopbooksproject.heroku.app)

HOME DO SITE:

[GIF DA HOMEPAGE DO SITE]

LINK DA ÁREA ADMINISTRATIVA: [XShop Books Project Admin](xshopboooksproject.heroku.app/admin)

ÁREA ADMINISTRATIVA DO SITE:

[GIF DO ADMIN DO SITE]

__*OBS: POR RAZÕES DE SEGURANÇA VOCÊ NÃO TERÁ COMO CRIAR UMA CONTA DE SUPERUSUÁRIO POR ISSO ACESSE AOS DADOS DE LOGIN DE UMA CONTA DE USUÁRIO ADMINISTRATIVA PREPARADA PARA O CASO DE VOCÊ QUISER TESTAR AS FUNCIONALIDADES DO PAINEL ADMINISTRATIVO MAS SE QUISERES UTILIZAR TAMBÉM UMA CONTA DE SUPERUSUÁRIO ENTRE EM CONTACTO COMIGO AQUI: [Portfólio freelancer](https://www.manassesndombele.com/)*__ 

### Dados de login do usuário administrativo

Usuário: Manasses_Ndombele

Senha: KALI/LINUX/2021.1

### Principais funções do projeto

1. *Autenticar usuários* - login, registro e logout

2. *Exibir os dados dos livros* - executando requisições para carregamento de livros, detalhes dos livros e pesquisa de livros específicos

3. *Simulação de carrinho de compras* - é possível adicionar e remover produtos do carrinho

4. *Lista de desejos* - é possível adicionar ou remover produtos na lista dos favoritos ou na lista dos salvos

5. *Conta de usuário* - é possível alterar os dados da sua conta

6. *Cupoms de desconto* - os usuários administradores podem adicionar ou remover cupoms e os usuários compradores têm acesso aos cupoms registrados na plataforma

7. *Histórico de compras* - o usuário comprador tem acesso ao seu histórico de compras, podendo ver a data e hora de suas compras como também o nome do livro comprado

8. *CRUD dos livros* - O Usuário administrador pode adicionar, editar e remover livros
9.  Vendas - Os usuários administradores podem também observar as vendas dos livros direto no painel administrativo

10. *Usuário administrador* - Um usuário administrador só pode ser adicionado por um super usuário administrador delimitando as restrições dos outros administradores e podendo até eliminar suas contas

11. *Segurança* - Todos os formulários do site foram protegidos contra ataques CSRF (Cross Site Request Forgery)...

### Tecnologias utilizadas

* Python 3.12
* Django 5.0.3
* HTML5
* CSS3
* JAVASCRIPT
* SASS
* BOOTSTRAP 5

### Dependências do projeto:

As dependências do projeto podem ser encontrados no diretório backend do projeto no meu GitHub no arquivo requirements.txt ou neste link: [Requirements.txt](https://www.github.com/requirements.txt)

### Instalação do projeto

No Windows:

```
git clone https://www.github.com/

cd "XShop - Books\backend\"
```

Instale o Python na sua máquina: [Python](https://www.python.org/downloads/)

Execute os comandos abaixo

```
pip install -r requirements.txt

python manage.py runserver
```

Acesse o projeto em seu navegador no endereço que aparecer no terminal ou cmd

Se fores fazer alguma alteração de estilos do projeto siga esses passos também:

Instale o nodejs na sua máquina: [NodeJS](https://www.nodejs.org/downloads/)

`instale o sass`

### Como usar?

* Clique no ícone de usuário no cabeçalho para fazer login ou se registrar.

* Clique no ícone de pesquisa no cabeçalho para pesquisar livros.

* Depois de pesquisar livros estará disponível um botão bem abaixo do último livro que apareceu como resultado da sua pesquisa, clique nele para recarregar todos os livros iniciais.

* Clique nos ícones de coração ou de salvar (tipo do Instagram) nos cards dos produtos para adicionar um produto na lista dos salvos ou favoritos.

* Clique no ícone de mais ou de menos nos cards dos livros para definir quantos livros deseja adicionar ao seu carrinho.

* Clique no botão adicionar nos cards dos livros para adicionar ao carrinho.

* Clique no ícone de carrinho com um número acima que está flutuando no lado inferior direito do site para ver seu carrinho.

* Clique no botão ver detalhes nos cards dos livros para ver mais detalhes dos livros.

* Clique no botão carregar mais livros no fim da área dos livros para carregar mais 5 livros.

* Na página de funcionalidades da conta /account/ clique no ícone de usuário na lista de funções para editar os dados da sua conta.

* Todos os outros ícones na lista de funções em /account/ são para poderes ver alguns outros dados da tua conta (Salvos, Favoritos, Histórico de compras e Cupoms)

NÃO ESQUECER DOS AGRADECIMENTOS, REFERÊNCIAS E LICENÇAS
