import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import checksApp from '../reducers';
import { PieceEnum } from './util';
import initialGame from './initialGame';

// définit la couleur de la pièce
const definePlayer = (i) => {
  if (i < 16) {
    return 'black';
  } else if (63 - i < 16) {
    return ('white');
  }

  return undefined;
};

// on définit le type de la pièce (grâce à la symétrie)
// 63-x = symétrie centrale
const definePiece = (i) => {
  // les rois et dames ne sont pas symétriques
  switch (i) {
    case 3:
    case 59:
      return PieceEnum.QUEEN;
    case 4:
    case 60:
      return PieceEnum.KING;
    default: break;
  }

  const half = (j) => {
    if (j >= 8 && j <= 15) {
      return PieceEnum.PAWN;
    }

    switch (j) {
      case 0:
      case 7 - 0:
        return PieceEnum.ROOK;
      case 1:
      case 7 - 1:
        return PieceEnum.KNIGHT;
      case 2:
      case 7 - 2:
      default:
        return PieceEnum.BISHOP;
    }
  };

  if (i < 16) {
    return half(i);
  } else if (63 - i < 16) {
    return half(63 - i);
  }
  return undefined;
};

// crée le board par défaut (placement initial)
/*
  TODO : refactor avec array.filter() ??; ex:  [2, 4, 6].filter(gt4).map(double); [8, 12]
*/
const getDefaultPieces = () => (
  // on déclare un Array de 64 élements
  // puis on applique les fonctions de définition sur chacun des squares
  [...Array(64)].map(
    (_, i) => ({
      id: i,
      player: definePlayer(i),
      piece: definePiece(i),
    }),
  )
);

const initialState = {
  squares: getDefaultPieces(),
  game: initialGame,
};

// Initialisation de socket io

const socket = io('http://localhost:3000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
const store = createStore(checksApp, initialState, applyMiddleware(socketIoMiddleware));

store.subscribe(() => {
  // console.log('new client state', store.getState());
});

// store.dispatch({
//   type: 'ADD_PIECE',
//   id: 17,
//   player: 'black',
//   piece: 'PAWN',
// });

export default store;
