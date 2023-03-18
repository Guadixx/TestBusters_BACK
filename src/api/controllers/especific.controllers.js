//POST COMMENT QUE HAGA PUSH AL TEST
//DELETE COMMENT QUE HAGA PULL AL TEST????
//LIKE COMMENT QUE HAGA PUSH O PULL A LO Q SEA Q LE DE

//CONTROLLADOR DE FIN DE TEST QUE MODIFIQUE TEST->SI RECORD USER MODIFIQUE AVERAGE/
//SI RECORD USER MODIFIQUE AVERAGE/ REPLACE  SI USER PRIMER RECORD PUSH A AVERAGE
//+1 TESTSPLAYED EN USER
//SI RECORD USER SUPERA A ALGUNO DE LEADERBOARD MODIFIQUE TEST Y SI SUME UNO A TIMES PLAYED
//SI PUNTUACION MODIFIQUE PUNTUACION EN FUNCIO DE SI PUNTUACION !=
//COMPROBACION DE ACHIEVEMENTS DE USER

//CONTROLADOR QUE MODIFIQUE TEST EN CASO DE FAVORITO, PARECIDO AL DE LIKES

//EN EL PUT DE TEST SI COMMENT ES FALSE BORRAR LOS COMENTS

//EN EL CREATE DEL TEST PUSH A CREATED DEL USER
//FOLLOWED Y FOLLOWING DEL MISMO ROLLO Q EL ME GUSTA EN CASO DE FOLLOWED EN EL OTRO TMB



//ACHIEVEMENT --------------------AUTH+ADMIN----------------------------
    //
    //
//COMMENT ---------------------------AUTH-------------------------------
    //
    //POST    -> $push EN _ID DEL TEST EN test.comments                                            DONE******************************
    //PUT     -> IF user._id ESTÁ $pull ELSE $push LIKES/HEARTS/HANDS/TEAR                         DONE******************************
    //PUT     -> PROTECTED DATE/USER/ID                                                            DONE******************************
    //GET ALL -> IF comment.user == null -> DELETE                                                 DONE******************************
    //
//COUNTRY ------------------------AUTH+ADMIN----------------------------
    //
    //GET ALL ->FILTER 1 Y 2                                                                       DONE******************************
    //
//DATA    ---------------------------AUTH + LEVEL------------------------
    //
    //POST    -> SE METEN TODAS EN UN LISTA Y POR CADA UNA SE HACE UN POST Y 
    //              UN $PUSH AL _ID DEL TEST Y DEFINIENDO EL ID DE NÚMERO                           DONE******************************
    //PUT  -> SE HACE UNO NUEVO Y SE DA LA POSIBILIDAD DE BORRAR EL ANTERIOR SI NO HA JUGADO NAIDE  DONE******************************
    //                ----------------------------------------------------------------------------- DONE******************************
    //       
//FTESTS  --------------------------AUTH PARA CREAR +LEVEL---------------
    //
    //GET ALL -> FILTER BY NAME Y PAGINACIÓN                                                          DONE******************************
    //PUT     -> PROTECTED CREATOR, SI COMMENTS_ENABLED==FALSE DELETE COMMENTS Y test.comments=[]     DONE******************************
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE TIMES_PLAYED Y AVERAGE/RATING/LEADERBOARD EN CASO    ----CONTROLADOR END TEST----
    //DELETE  ->
    //
//GTESTS  ---------------------------AUTH PARA CREAR +LEVEL--------------
    // 
    //GET ALL -> FILTER BY NAME Y PAGINACIÓN                                                         DONE******************************
    //PUT     -> PROTECTED CREATOR, SI COMMENTS_ENABLED==FALSE DELETE COMMENTS Y test.comments=[]    DONE******************************
    //PUT     -> PARA FAVOURITE QUE FUNCIONE IGUAL QUE LIKES Y ESO                                   DONE*****************************
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE TIMES_PLAYED Y AVERAGE/RATING/LEADERBOARD EN CASO                 ----CONTROLADOR END TEST----
    //
//LEADERBOARD  ---------------------------AUTH---------------------------
    //
    //POST    -> COMPROBACIÓN SI SUPERA Y REAJUSTE
    //PUT     -> USER PROTECTED
    //
//RECORDS      ---------------------------AUTH---------------------------
    //
    //POST    -> COMPORBAR SI EXISTE SI NO CREAR                                                        ----CONTROLADOR END TEST----
    //PUT     -> USER PROTECTED
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE LASTSCORE Y RATING/SCORE EN CASO                       ----CONTROLADOR END TEST----
    //
//USERS       
    //
    //DELETE      DELETE RECORDS Y CREATED TESTS ---                                                DONE*****************************
    //GET ALL ->  FILTER BY NAME Y PAGINACIÓN
    //PUT DE LEVEL Y NEXT_LEVEL                                                                     ----CONTROLADOR END TEST----
    //TEST_PLAYED Y ACHIEVEMENTS AL FINALIZAR TEST                                                  ----CONTROLADOR END TEST----