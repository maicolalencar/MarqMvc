﻿    $(function () {

        var btnEditarAgendamento = $("#btnEditarAgendamento");
        var lnkIncluirNovo = $('#lnkIncluirNovo');
        var lnkVoltar = $('#lnkVoltar');
        var divAgendamentosReadOnly = $('#divAgendamentosReadOnly');

        var btnAlterarAgendamento = $('.btn-alterar-agendamento');
        var btnExcluirAgendamento = $('.btn-excluir-agendamento');

        var dadosCadastraisCliente = $('#dadosCadastraisCliente');
        var btnSalvar = $("#btnSalvar");

            //var btnSalvarAgendamento = $('.btn-excluir-agendamento');
        btnEditarAgendamento.on('click', function () {
        AlternarLigarEdicaoAgendamento();
    });

            var AlternarLigarEdicaoAgendamento = function () {
        dadosCadastraisCliente.fadeOut();
    //divAgendamentosReadOnly.hide();
    //divAgendamentos.css("display", "block");
    lnkIncluirNovo.css("display", "block");
                lnkVoltar.css("display", "block");
                btnSalvar.css("display", "none");
                btnEditarAgendamento.css("display", "none");

                //$('#btnAlterar').each(function () {$(this).css("display", "block")});
                //$('.btnAlterarAgendamento').css("display", "block");
                $('.btn-alterar-agendamento').css("display", "block");
                $('.btn-excluir-agendamento').css("display", "block");
            };

            lnkVoltar.on('click', function () {
        AlternarDesligarEdicaoAgendamento();
    });
            //todo:verificar se compensa ir
            var AlternarDesligarEdicaoAgendamento = function () {
        dadosCadastraisCliente.fadeIn();
    //divAgendamentosReadOnly.show();
    //divAgendamentos.css("display", "none");
    lnkIncluirNovo.css("display", "none");
                lnkVoltar.css("display", "none");
                btnSalvar.css("display", "block");
                btnEditarAgendamento.css("display", "block");

                $('.btn-alterar-agendamento').css("display", "none");
                $('.btn-excluir-agendamento').css("display", "none");

            };

            var eventosBotoesAgendamento = function () {
        $(".btn-alterar-agendamento").unbind('click');
    $(".btn-excluir-agendamento").unbind('click');
                //#region btnAlterarAgendamento
                $('.btn-alterar-agendamento').on('click', function () {
                    //alert(($(this).parent().find('#itemAgenda_DiaDaSemana').val()));
                    //alert(($(this).closest().children('#itemAgenda_DiaDaSemana').val()));
                    //alert($(this).closest('tr').find('#itemAgenda_DiaDaSemana').val());
                    var tr = $(this).closest('tr');
                    tr.find('#itemAgenda_DiaDaSemana').prop('disabled', false);
                    tr.find('#itemAgenda_Hora').prop('disabled', false);
                    tr.find('.btn-alterar-agendamento').css("display", "none");
                    //tr.find('.btn-excluir-agendamento').css("display", "none");
                    tr.find('.btn-salvar-agendamento').css("display", "block");

                    tr.find('.btn-salvar-agendamento').on('click', function () {
                        //edição agendamentos
                        var jsonAgendamento = {
        agendamento: {
        ClienteIdCliente: $('#IdCliente').val(),
                                Id: tr.find('#itemAgenda_Id').val(),
                                DiaDaSemana: tr.find('#itemAgenda_DiaDaSemana').val(),
                                Hora: tr.find('#itemAgenda_Hora').val()
                            }
                        };

                        $.ajax({
                            url: "/Cliente/AlterarAgendamento",
                            type: "POST",
                            data: jsonAgendamento,
                            dataType: "json",
                            error: function (response) {
        $('#mensagem').html(response.mensagem);
    window.scrollTo(0, 0);
                            },
                            success: function (response) {

                                if (response.success) {
        //window.location.href = "@Url.Action("ClienteLista")";

        tr.find('#itemAgenda_DiaDaSemana').prop('disabled', true);
    tr.find('#itemAgenda_Hora').prop('disabled', true);
                                    tr.find('.btn-alterar-agendamento').css("display", "block");
                                    tr.find('.btn-excluir-agendamento').css("display", "block");
                                    tr.find('.btn-salvar-agendamento').css("display", "none");
                                }
                                else {
        $('#mensagem').html(response.mensagem);
    window.scrollTo(0, 0);
                                }

                            }
                        });
                    });
                });
                //#endregion btnAlterarAgendamento

                //#region btnExcluirAgendamento
                $('.btn-excluir-agendamento').on('click', function () {
                    var tr = $(this).closest('tr');
                    //excluir agendamento
                    var jsonAgendamento = {
        agendamento: {
        Id: tr.find('#itemAgenda_Id').val(),
                            DiaDaSemana: tr.find('#itemAgenda_DiaDaSemana').val(),
                            Hora: tr.find('#itemAgenda_Hora').val()
                        }
                    };

                    $.ajax({
        url: "/Cliente/ExcluirAgendamento",
                        type: "POST",
                        data: jsonAgendamento,
                        dataType: "json",
                        error: function (response) {
        $('#mensagem').html(response.mensagem);
    window.scrollTo(0, 0);
                        },
                        success: function (response) {

                            if (response.success) {
        tr.hide();
    //window.location.href = "@Url.Action("ClienteLista")";

    //tr.find('#itemAgenda_DiaDaSemana').prop('disabled', true);
    //tr.find('#itemAgenda_Hora').prop('disabled', true);
    //tr.find('#btnAlterar').css("display", "block");
    //tr.find('#btnExcluir').css("display", "block");
    //tr.find('#btnSalvarAgendamento').css("display", "none");
    }
                            else {
        $('#mensagem').html(response.mensagem);
    window.scrollTo(0, 0);
                            }

                        }
                    });
                });
                //#endregion btnExcluirAgendamento
            }

            var lnkIncluirNovo = $('#lnkIncluirNovo');
            var divItemAgendamento = $('#divItemAgendamento');
            lnkIncluirNovo.on("click", function () {
                //incluir agendamentos
                var jsonAgendamento = {
        agendamento: {
        ClienteIdCliente: $('#IdCliente').val(),
                        DiaDaSemana: '0',
                        Hora: '00:00:00'
                    }
                };

                $.ajax({
        url: "/Cliente/IncluirAgendamento",
                    type: "POST",
                    data: jsonAgendamento,
                    dataType: "json",
                    error: function (response) {
        $('#mensagem').html(response.mensagem);
    window.scrollTo(0, 0);
                    },
                    success: function (response) {

                        if (response.success) {
                            //window.location.href = "@Url.Action("ClienteLista")";
                            //var hmtlAdicionarAgendamento = `
                            //    <div id="divAgendamentos" class="row">
                            //        <div>
                            //            <div id="divItemAgendamento" class="col-md-4" style="overflow: hidden;">
                            //                <table>
                            //                    <tbody>
                            //                        <tr>
                            //                            <td>
                            //                                <label asp-for="DiaDaSemana" class="control-label"></label>
                            //                                <select asp-for="DiaDaSemana" asp-items="Html.GetEnumSelectList<DiasDaSemana>()" class="form-control"></select>
                            //                                <span asp-validation-for="DiaDaSemana" class="text-danger"></span>
                            //                </div>
                            //                <div class="form-group">
                            //                    <label asp-for="Hora" class="control-label"></label>
                            //                    <input asp-for="Hora" class="form-control" />
                            //                    <span asp-validation-for="Hora" class="text-danger"></span>
                            //                </div>
                            //            </div>
                            //        </div>
                            //    </div>
                            //    `;
                            var hmtlAdicionarAgendamento = `<div id="divItemAgendamentoReadOnly">
        <table>
            <tbody>
                <tr>
                    <td>
                        <input class="form-control" style="display:none" disabled="" type="number" id="itemAgenda_Id" name="itemAgenda.Id" value="` + response.novoAgendamentoId + `">
                            <span class="text-danger field-validation-valid" disabled="" data-valmsg-for="itemAgenda.Id" data-valmsg-replace="true"></span>
                                    </td>
                        <td>
                            <select class="form-control" disabled="" id="itemAgenda_DiaDaSemana" name="itemAgenda.DiaDaSemana"><option selected="selected" value="0">Domingo</option>
                                <option value="1">Segunda-feira</option>
                                <option value="2">Terça-feira</option>
                                <option value="3">Quarta-feira</option>
                                <option value="4">Quinta-feira</option>
                                <option value="5">Sexta-feira</option>
                                <option value="6">Sábado</option>
                            </select>
                            <span class="text-danger field-validation-valid" data-valmsg-for="itemAgenda.DiaDaSemana" data-valmsg-replace="true"></span>
                        </td>
                        <td>
                            <input class="form-control" disabled="" type="time" id="itemAgenda_Hora" name="itemAgenda.Hora" value="00:00:00">
                                <span class="text-danger field-validation-valid" data-valmsg-for="itemAgenda.Hora" data-valmsg-replace="true"></span>
                                    </td>
                            <td>
                                <input type="button" value="Alterar" style="display:block" class="btn-default btn-alterar-agendamento" />
                                <input type="button" value="Salvar" style="display:none" class="btn-default btn-salvar-agendamento" />                                                    </td>
                            <td>
                                <input type="button" value="Excluir" style="display:block" class="btn-default btn-excluir-agendamento" />
                            </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
                            //tr.find('#itemAgenda_DiaDaSemana').prop('disabled', true);
                            //tr.find('#itemAgenda_Hora').prop('disabled', true);
                            //tr.find('#btnAlterar').css("display", "block");
                            //tr.find('#btnExcluir').css("display", "block");
                            //tr.find('#btnSalvarAgendamento').css("display", "none");
                        }
                        else {
            $('#mensagem').html(response.mensagem);
        window.scrollTo(0, 0);
                        }

                        divAgendamentosReadOnly.append(hmtlAdicionarAgendamento);
                        eventosBotoesAgendamento();
                    }
                });
            });
            eventosBotoesAgendamento();
        });