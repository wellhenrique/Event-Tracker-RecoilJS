import React from 'react';
import { IEvento } from '../../interfaces/IEvento'
import style from './Evento.module.scss';
import EventoCheckbox from './EventoCheckbox';
import { useSetRecoilState } from 'recoil';
import { listaDeEventosState } from '../../states/atom';

const Evento: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)

  const excluirEvento = () => {
    setListaDeEventos(listaAntiga => listaAntiga.filter(eventos => eventos.id !== evento.id))
  }

  const alterarStatusEvento = () => {
    evento.completo = !evento.completo
    setListaDeEventos(listaAntiga => {
      const indice = listaAntiga.findIndex(eventos => eventos.id === evento.id)
      return [...listaAntiga.slice(0, indice), evento, ...listaAntiga.slice(indice + 1)]
    })
  }

  const estilos = [
    style.Evento
  ]

  if (evento.completo) {
    estilos.push(style.completo)
  }

  return (<div className={estilos.join(' ')}>

    <EventoCheckbox evento={evento} aoAlterarStatus={alterarStatusEvento} />
    <div className="cards-info">
      <h3 className={style.descricao}>{evento.descricao} - {evento.inicio.toLocaleDateString()}</h3>
    </div>
    <i className="far fa-times-circle fa-2x" onClick={excluirEvento}></i>
  </div>)
}

export default Evento