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
    //POST    -> $push EN _ID DEL TEST EN test.comments
    //PUT     -> IF user._id ESTÁ $pull ELSE $push LIKES/HEARTS/HANDS/TEAR
    //PUT     -> PROTECTED DATE/USER/ID
    //GET ALL -> IF comment.user == null -> DELETE
    //DELETE  -> BY USERTEST O USERCOMMENT
    //
//COUNTRY ------------------------AUTH+ADMIN----------------------------
    //
    //GET ALL ->FILTER 1 Y 2
    //
//DATA    ---------------------------AUTH + LEVEL------------------------
    //
    //POST    -> SE METEN TODAS EN UN LISTA Y POR CADA UNA SE HACE UN POST Y UN $PUSH AL _ID DEL TEST Y DEFINIENDO EL ID DE NÚMERO
    //PUT     -> SE METEN TODAS EN UN LISTA Y POR CADA UNA SE HACE UN POST Y UN $PUSH AL _ID DEL TEST BORRANDO LO ANTERIOR Y REDEFINIENDO EL ID DE NÚMERO
    //        -> SI TIMES PLAYED ES == 0 SE PUEDE MODIFICAR Y DELETE DEL ORIGINAL. SI NO SE PUEDE CREAR UNO NUEVO EN BASE A ESE. Y SI QUIERE MODIFICAR UNA ERRATA O ALGO Q NOS MANDE UN CORREO
    //       
//FTESTS  --------------------------AUTH PARA CREAR +LEVEL---------------
    //
    //GET ALL -> FILTER BY NAME Y PAGINACIÓN
    //PUT     -> PROTECTED CREATOR, SI COMMENTS_ENABLED==FALSE DELETE COMMENTS Y test.comments=[]
    //PUT     -> PARA FAVOURITE QUE FUNCIONE IGUAL QUE LIKES Y ESO
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE TIMES_PLAYED Y AVERAGE/RATING/LEADERBOARD EN CASO
    //DELETE  ->
    //
//GTESTS  ---------------------------AUTH PARA CREAR +LEVEL--------------
    //
    //GET ALL -> FILTER BY NAME Y PAGINACIÓN
    //PUT     -> PROTECTED CREATOR, SI COMMENTS_ENABLED==FALSE DELETE COMMENTS Y test.comments=[]
    //PUT     -> PARA FAVOURITE QUE FUNCIONE IGUAL QUE LIKES Y ESO
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE TIMES_PLAYED Y AVERAGE/RATING/LEADERBOARD EN CASO
    //
//LEADERBOARD  ---------------------------AUTH---------------------------
    //
    //POST    -> COMPROBACIÓN SI SUPERA Y REAJUSTE
    //PUT     -> USER PROTECTED
    // 
//RECORDS      ---------------------------AUTH---------------------------
    //
    //POST    -> COMPORBAR SI EXISTE SI NO CREAR
    //PUT     -> USER PROTECTED
    //PUT     -> AL FINAL DEL TEST QUE MODIFIQUE LASTSCORE Y RATING/SCORE EN CASO
    //
//USERS       
    //
    //GET ALL -> FILTER BY NAME Y PAGINACIÓN
    //PUT DE LEVEL Y NEXT_LEVEL
    //TEST_PLAYED Y ACHIEVEMENTS AL FINALIZAR TEST