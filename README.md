# App

Gympass style app.

## RFs

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias mais próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário fazer o check-in em uma academia;
- [ ] Deve ser possível a academia validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia; 

## RN

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [ ] O usuário não deve poder se autenticar com a senha errada;
- [ ] O usuário não deve poder fazer 2 check-ins no mesmo dia;
- [ ] O usuário não deve poder fazer check-in fora do raio (100m) da academia;
- [ ] O check-in só pode ser validado até (20) minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam presistir em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
