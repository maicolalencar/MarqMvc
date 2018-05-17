$(function () {

    var btnEditarPagamento = $("#btnEditarPagamento");
    var lnkIncluirNovoPagamento = $('#lnkIncluirNovoPagamento');
    var lnkVoltarPagamento = $('#lnkVoltarPagamento');
    var divPagamentos = $('#divPagamentos');
    var divAgendamentos = $('#divAgendamentos');

    var btnAlterarPagamento = $('.btn-alterar-pagamento');
    var btnExcluirPagamento = $('.btn-excluir-pagamento');

    var dadosCadastraisCliente = $('#dadosCadastraisCliente');
    var btnSalvar = $("#btnSalvar");

    btnEditarPagamento.on('click', function () {
        AlternarLigarEdicaoPagamento();
    });

    var AlternarLigarEdicaoPagamento = function () {
        //deixa os outro itens invisiveis
        dadosCadastraisCliente.fadeOut();
        divAgendamentos.fadeOut();
        lnkIncluirNovoPagamento.css("display", "block");
        lnkVoltarPagamento.css("display", "block");
        btnSalvar.css("display", "none");
        btnEditarPagamento.css("display", "none");

        $('.btn-alterar-pagamento').css("display", "block");
        $('.btn-excluir-pagamento').css("display", "block");
    };

    lnkVoltarPagamento.on('click', function () {
        AlternarDesligarEdicaoPagamento();
    });
    var AlternarDesligarEdicaoPagamento = function () {
        dadosCadastraisCliente.fadeIn();
        divAgendamentos.fadeIn();
        lnkIncluirNovoPagamento.css("display", "none");
        lnkVoltarPagamento.css("display", "none");
        btnSalvar.css("display", "block");
        btnEditarPagamento.css("display", "block");

        $('.btn-alterar-pagamento').css("display", "none");
        $('.btn-excluir-pagamento').css("display", "none");

    };

    var eventosBotoesPagamento = function () {
        $(".btn-alterar-pagamento").unbind('click');
        $(".btn-excluir-pagamento").unbind('click');
        //#region btnAlterarPagamento
        $('.btn-alterar-pagamento').on('click', function () {
            var tr = $(this).closest('tr');
            tr.find('#itemPagamento_DataPagamento').prop('disabled', false);
            tr.find('#itemPagamento_Valor').prop('disabled', false);
            tr.find('.btn-alterar-pagamento').css("display", "none");
            tr.find('.btn-salvar-pagamento').css("display", "block");

            tr.find('.btn-salvar-pagamento').on('click', function () {
                //edição pagamentos
                var jsonPagamento = {
                    pagamento: {
                        IdCliente: $('#IdCliente').val(),
                        Id: tr.find('#itemPagamento_Id').val(),
                        DataPagamento: tr.find('#itemPagamento_DataPagamento').val(),
                        Valor: tr.find('#itemPagamento_Valor').val()
                    }
                };

                $.ajax({
                    url: "/Pagamento/PagamentoAlterar",
                    type: "POST",
                    data: jsonPagamento,
                    dataType: "json",
                    error: function (response) {
                        $('#mensagem').html(response.mensagem);
                        window.scrollTo(0, 0);
                    },
                    success: function (response) {

                        if (response.success) {
                            tr.find('#itemPagamento_DataPagamento').prop('disabled', true);
                            tr.find('#itemPagamento_Valor').prop('disabled', true);
                            tr.find('.btn-alterar-pagamento').css("display", "block");
                            tr.find('.btn-excluir-pagamento').css("display", "block");
                            tr.find('.btn-salvar-pagamento').css("display", "none");
                        }
                        else {
                            $('#mensagem').html(response.mensagem);
                            window.scrollTo(0, 0);
                        }

                    }
                });
            });
        });
        //#endregion btnAlterarPagamento

        //#region btnExcluirPagamento
        $('.btn-excluir-pagamento').on('click', function () {
            var tr = $(this).closest('tr');
            //excluir pagamento
            var jsonPagamento = {
                pagamento: {
                    Id: tr.find('#itemPagamento_Id').val(),
                    DataPagamento: tr.find('#itemPagamento_DataPagamento').val(),
                    Valor: tr.find('#itemPagamento_Valor').val()
                }
            };

            $.ajax({
                url: "/Pagamento/PagamentoExcluir",
                type: "POST",
                data: jsonPagamento,
                dataType: "json",
                error: function (response) {
                    $('#mensagem').html(response.mensagem);
                    window.scrollTo(0, 0);
                },
                success: function (response) {

                    if (response.success) {
                        tr.hide();
                    }
                    else {
                        $('#mensagem').html(response.mensagem);
                        window.scrollTo(0, 0);
                    }

                }
            });
        });
        //#endregion btnExcluirPagamento
    }

    var lnkIncluirNovoPagamento = $('#lnkIncluirNovoPagamento');
    var divItemPagamento = $('#divItemPagamento');
    lnkIncluirNovoPagamento.on("click", function () {
        //incluir pagamentos
        var jsonPagamento = {
            pagamento: {
                IdCliente: $('#IdCliente').val(),
                DataPagamento: '01/01/1900',
                Valor: '0'
            }
        };

        $.ajax({
            url: "/Pagamento/PagamentoAdicionar",
            type: "POST",
            data: jsonPagamento,
            dataType: "json",
            error: function (response) {
                $('#mensagem').html(response.mensagem);
                window.scrollTo(0, 0);
            },
            success: function (response) {

                if (response.success) {
                    var hmtlAdicionarPagamento = `<div id="divItemPagamento">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input style="display:none" class="form-control" disabled="" type="number" data-val="true" data-val-required="The Id field is required." id="itemPagamento_Id" name="itemPagamento.Id" value="` + response.novoPagamentoId + `">
                                <span class="text-danger field-validation-valid" disabled="" data-valmsg-for="itemPagamento.Id" data-valmsg-replace="true"></span>
                            </td>
                            <td>
                                <input class="form-control" type="date" disabled data-val="true" data-val-required="The Data Pagamento field is required." id="itemPagamento_DataPagamento" name="itemPagamento.DataPagamento" value="1900-01-01">
                                <span class="text-danger field-validation-valid" disabled="" data-valmsg-for="itemPagamento.DataPagamento" data-valmsg-replace="true"></span>
                            </td>
                            <td>
                                <input class="form-control" type="text" disabled data-val="true" data-val-number="The field Valor must be a number." data-val-required="The Valor field is required." id="itemPagamento_Valor" name="itemPagamento.Valor" value="0.0">
                                <span class="text-danger field-validation-valid" data-valmsg-for="itemPagamento.Valor" data-valmsg-replace="true"></span>
                            </td>
                            <td>
                                <input type="button" value="Alterar" style="display: block;" class="btn-default btn-alterar-pagamento">
                                <input type="button" value="Salvar" style="display: none;" class="btn-default btn-salvar-pagamento">
                            </td>
                            <td>
                                <input type="button" value="Excluir" style="display: block;" class="btn-default btn-excluir-pagamento">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`
                }
                else {
                    $('#mensagem').html(response.mensagem);
                    window.scrollTo(0, 0);
                }

                divPagamentos.append(hmtlAdicionarPagamento);
                eventosBotoesPagamento();
            }
        });
    });
    eventosBotoesPagamento();
});