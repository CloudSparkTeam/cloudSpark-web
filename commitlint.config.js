module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'header-max-length': [2, 'always', 100],
      'type-enum': [
        2,
        'always',
        [
          'feat',     // nova feature
          'fix',      // correção de bug
          'docs',     // documentação
          'style',    // mudança de estilo
          'refactor', // refatoração de código
          'perf',     // melhoria de performance
          'test',     // testes
          'chore'     // tarefas de manutenção
        ]
      ],
      'scope-case': [2, 'always', 'upper-case'], // O escopo deve estar em maiúsculas
      'subject-empty': [2, 'never'],              // O assunto não pode estar vazio
      'type-empty': [2, 'never'],                 // O tipo não pode estar vazio
      'subject-full-stop': [2, 'never', '.'],     // O assunto não deve terminar com ponto
      'type-case': [2, 'always', 'lower-case'],   // O tipo deve ser em minúsculas
      'subject-case': [2, 'never', ['lower-case', 'pascal-case']], // Permitir apenas lowercase ou pascal case
    }
  };
  