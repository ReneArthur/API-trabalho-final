const request = require('supertest');
const { app } = require('./app')

describe('Verificação de endpoints protegidos', () => {

    const caminhosCrud = ["produtos", "alocacao", "usuarios"]

    caminhosCrud.forEach((caminho) => {
        caminho = "/" + caminho
        test(`${caminho} tem que estar protegido`, async () => {
            await request(app)
                .get(caminho)
                .expect('Content-Type', /json/)
                .expect(401);
            
            await request(app)
                .post(caminho)
                .expect('Content-Type', /json/)
                .expect(401);
            
            await request(app)
                .put(caminho)
                .expect('Content-Type', /json/)
                .expect(401);
    
            await request(app)
                .delete(caminho)
                .expect('Content-Type', /json/)
                .expect(401);
        });
    })
});


describe('Login e Registro de usuários', () => {

    let idSuperUsuario
    let idUsuarioComum1
    let idUsuarioComum2

    let tokenSuperUsuario

    const agent = request.agent(app);
    agent.set('Content-Type', 'application/json')

    test('Tem que retornar o token ao fazer login', async () => {
        console.log("teste")
        
        const login = {email: 'email@email.com', senha: 'senha123456'}
        const res = await agent
            .post('/login')
            .send(login)
            .expect('Content-Type', /json/)
            .expect(200)
            
        expect(res.body).toHaveProperty('token')
        agent.set('token', res.body.token)
        tokenSuperUsuario = res.body.token
    })
    test('Super usuário pode criar outros super usuários', async () => {
        const novoSuperUsuario = {
            email: "outra@superteste.com",
            senha: "abcdef",
            superuser: true
        }
        const res = await agent
            .post("/usuarios")
            .send(novoSuperUsuario)
            .expect('Content-Type', /json/)
            .expect(201)

        expect(res.body.email).toBe(novoSuperUsuario.email)
        expect(res.body.superuser).toBe(novoSuperUsuario.superuser)
        expect(res.body.senha).not.toBe(novoSuperUsuario.senha)

        idSuperUsuario = res.body.id
    })
    
    test('Super usuário pode criar um usuário comum', async () => {
        const novoUsuarioComum = {
            email: "outra2@superteste.com",
            senha: "abcdef2",
            superuser: false
        }
        const res = await agent
            .post("/usuarios")
            .send(novoUsuarioComum)
            .expect('Content-Type', /json/)
            .expect(201)

        expect(res.body.email).toBe(novoUsuarioComum.email)
        expect(res.body.superuser).toBe(novoUsuarioComum.superuser)
        expect(res.body.senha).not.toBe(novoUsuarioComum.senha)

        idUsuarioComum1 = res.body.id
    })

    test('Deve ser possível logar como um usuário comum', async () => {
        const loginComum = {email: "outra2@superteste.com", senha: "abcdef2"}

        const res = await agent
            .post("/login")
            .send(loginComum)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(res.body).toHaveProperty('token')
        agent.set('token', res.body.token)
    })

    test('Não deve ser possível criar um superusuário sendo um usuário comum', async () => {
        const novoSuperUsuario = {
            email: "outra3@superteste.com",
            senha: "abcdef3",
            superuser: true
        }

        const res = await agent
            .post("/usuarios")
            .send(novoSuperUsuario)
            .expect(403)
    })

    test('Deve ser possível criar um outro usuário comum sendo um usuário comum', async () => {
        const novoUsuarioComum = {
            email: "outra3@superteste.com",
            senha: "abcdef3",
            superuser: false
        }

        const res = await agent
            .post("/usuarios")
            .send(novoUsuarioComum)
            .expect(201)

        expect(res.body.email).toBe(novoUsuarioComum.email)
        expect(res.body.superuser).toBe(novoUsuarioComum.superuser)
        expect(res.body.senha).not.toBe(novoUsuarioComum.senha)

        idUsuarioComum2 = res.body.id
    })

    test("Não deve ser possível excluir um usuário sendo um usuário comum", async () => {
        await agent
            .delete(`/usuarios/${idUsuarioComum1}`)
            .expect(403)
    })

    test("Deve ser possível excluir usuários sendo um super usuário", async () => {
        agent.set("token", tokenSuperUsuario)
        await agent
            .delete(`/usuarios/${idUsuarioComum1}`)
            .expect(200)
        await agent
            .delete(`/usuarios/${idUsuarioComum2}`)
            .expect(200)
        await agent
            .delete(`/usuarios/${idSuperUsuario}`)
            .expect(200)
    })

})

describe('Lógica de criação de superusuários', () => {
    
})