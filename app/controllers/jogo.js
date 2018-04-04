module.exports.jogo = function(application, req, res){
    if(req.session.autorizado !== true){
        res.render('index', { validacao: {}});
        return;
    }

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(usuario, res, casa, msg);
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render('index', {validacao: {}});
    });
    
}

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.render('index', { validacao: {}});
        return;
    }
    res.render('aldeoes');
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.render('index', { validacao: {}});
        return;
    }
    res.render('pergaminhos');
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    
    if(req.session.autorizado !== true){
        res.render('index', { validacao: {}});
        return;
    }
    
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');

}

