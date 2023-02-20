<?php
header("access-control-allow-origin: *");
header(
    "access-control-allow-headers: x-api-key, origin, x-requested-with, content-type, accept, access-control-request-method"
);
$server = "localhost";
$user = "root";
$passwd = '*MDBthor4314$$';
$db = "fiestas";
$connection = mysql_connect($server, $user, $passwd);
mysql_set_charset("utf8", $connection);
$response["OK"] = true;
if($_POST['optionService'] != 'SelectCotizador')
    foreach ($_POST as $clave => $valor) {
        if ($clave != "optionService" && $clave != "contenido") {
            $_POST[$clave] =
                "'" . mysql_real_escape_string($valor, $connection) . "'";
        }
    }
$queryFunctions = [
    "UsersRol" => function () use ($connection, &$response) {
        extract($_POST);
        $response["UsersRol"] = executeQuery(
            "SELECT rol FROM fiestas.usuarioFiesta WHERE noempl = $noempl",
            $connection
        );
        $response[
            "sql"
        ] = "SELECT rol FROM fiestas.usuarioFiesta WHERE noempl = $noempl";
        $response["UsersRol"] = $response["UsersRol"][0];
    },
    "SelectCefsHorarios" => function () use ($connection, &$response) {
        $response["cefs"] = executeQuery(
            "SELECT * FROM fiestas.SelectCefsHorarios;",
            $connection
        );
    },
    "CreateUser" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "INSERT INTO `fiestas`.`usuarioFiesta` (`noempl`,`rol`,`cef_id`) VALUES ($noempl,$rol,$cef)";
        $response["OK"] = executeUpdate($sql, $connection);
    },
    "UpdateUser" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "UPDATE `fiestas`.`usuarioFiesta` SET `cef_id` = $cef , `rol` = $rol WHERE `noempl` = $noempl";
        $response["sql"] = $sql;
        $response["OK"] = executeUpdate($sql, $connection);
    },
    "SelectUsers" => function () use ($connection, &$response) {
        $response["users"] = executeQuery(
            "SELECT noempl,cef_id as cef, c.local as codigoCef , rol ,CASE WHEN rol = 1 THEN 'Fiestologo' WHEN rol = 2 THEN 'Gerente' ELSE 'Administrador' END as rolDescripcion,CONCAT(nombre , ' ' , a_paterno , ' ' , a_materno ) as nombre , correo, tel1 as telefono  FROM fiestas.usuarioFiesta a LEFT JOIN capital.empleados_eslabon b ON a.noempl = b.id_empleado AND b.id IS NOT NULL LEFT JOIN diniz.locales c ON a.cef_id = c.id WHERE b.id is not null AND a.rol < 9 GROUP BY a.id ORDER BY a.id DESC;",
            $connection
        );
    },
    "SelectNoemplsOptions" => function () use ($connection, &$response) {
        // , correo, tel1 as telefono
        $response["noempls"] = executeQuery(
            "SELECT id_empleado as `value`, CONCAT(`id_empleado`,'-',`nombre` , ' ' , `a_paterno` , ' ' , a_materno ) as `label` FROM capital.empleados_eslabon where estatus= 'ACTIVO' group by id_empleado order by `value` DESC;",
            $connection
        );
    },
    "SelectCefsOptions" => function () use ($connection, &$response) {
        // , correo, tel1 as telefono
        $response["cefs"] = executeQuery(
            "SELECT id as value, CONCAT (local, ' - ' , descripcion) as label FROM diniz.locales where eslocal = 's' AND local NOT LIKE 'PB%';",
            $connection
        );
    },
    "deleteUser" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "DELETE FROM fiestas.usuarioFiesta WHERE noempl = $noempl";
        $response["sql"] = $sql;
        $response["OK"] = executeUpdate($sql, $connection);
    },
    "UpdateCef" => function () use ($connection, &$response) {
        extract($_POST);
        $sql ="call fiestas.capacidadCef($id, $capacidadSalones); "; 
        $response["OK"] = executeUpdate($sql, $connection);
    },
    "SelectClientes" => function () use ($connection, &$response) {
        $response["clientes"] = executeQuery(
            "SELECT id,nombre, correo, telefono, CASE WHEN tipo = 2 THEN 'Invitado' WHEN tipo = 1 THEN 'Prospecto' END as tipo FROM fiestas.invitados ORDER BY id DESC;  ",
            $connection
        );
    },
   "SelectMetasCefs" => function () use ($connection, &$response) {
        $response["metasCefs"] = executeQuery(
            "SELECT * FROM fiestas.SelectAllCefsMetas ",
            $connection
        );
        foreach ($response['metasCefs'] as $key => $value) 
            foreach ($value as $key2 => $value2) 
                $response['metasCefs'][$key][$key2] = $value2 == null ? 0 : $value2;
    },
   "UpdateMetasCefs" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "SELECT id FROM fiestas.metasLocales WHERE localid = $localid";

        $existente = executeQuery($sql, $connection);

 
         $sqlUpdate = "UPDATE fiestas.metasLocales SET meta = CASE WHEN mes=1 THEN $ene WHEN mes=2 THEN $feb WHEN mes=3 THEN $mar WHEN mes=4 THEN $abr WHEN mes=5 THEN $may WHEN mes=6 THEN $jun WHEN mes=7 THEN $jul WHEN mes=8 THEN $ago WHEN mes=9 THEN $sep WHEN mes=10 THEN $oct WHEN mes=11 THEN $nov WHEN mes=12 THEN $dic ELSE meta END WHERE localid=$localid;";
        
        
         if(sizeof($existente) > 0) { 
            $response["OK"] = executeUpdate($sqlUpdate, $connection);
        }
        else {
            $sql = "INSERT INTO `fiestas`.`metasLocales` (`localid`, `mes`, `ano`, `meta`) VALUES " ; 
            for ($i=1; $i <= 12 ; $i++) { 
                if($i == 12) $sql .= "($localid, '$i', '23', '0')";
                else $sql .= "($localid, '$i', '23', '0'),";
            }
            $response["OK"] = executeUpdate($sql, $connection) ; 
            if($response["OK"]) executeUpdate($sqlUpdate, $connection);
            // echo $sql ;
        }
    },
    "SelectPagos" => function () use ($connection, &$response) {
        $response["pagos"] = executeQuery(
            "SELECT a.cotizacion,  a.monto , a.date, a.noempl, CASE a.comisionado WHEN 1 THEN 'Si' ELSE 'No' END as comisionado , c.local as cef, f.nombre FROM fiestas.pagosFiestas a LEFT JOIN fiestas.fiesta b ON cotizacion = b.id LEFT JOIN fiestas.invitados f ON b.invitados_id = f.id LEFT JOIN diniz.locales c ON b.cef_id = c.id ORDER BY a.date",
            $connection
        );
    },
    "SelectPagosFiesta" => function () use ($connection, &$response) {
        extract($_POST);
        $response["pagos"] = executeQuery(
            "SELECT a.cotizacion,  a.monto , a.date, a.noempl, CASE a.comisionado WHEN 1 THEN 'Si' ELSE 'No' END as comisionado , c.local as cef  , f.nombre FROM fiestas.pagosFiestas a LEFT JOIN fiestas.fiesta b ON cotizacion = b.id LEFT JOIN diniz.locales c ON b.cef_id = c.id LEFT JOIN fiestas.invitados f ON b.invitados_id = f.id WHERE a.cotizacion = $noFiesta ORDER BY a.date",
            $connection
        );
    },
    "SelectCotizacionesAutorizar" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "SELECT * FROM fiestas.view_SelectFiestas where estado = 3 ;" ; 
        $response["fiestas"] = executeQuery(
            $sql,
            $connection
        );
    },
    "SelectCotizaciones" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "SELECT * FROM fiestas.view_SelectFiestas where estado IN (1,2,3) ;" ; 
        $response["fiestas"] = executeQuery(
            $sql,
            $connection
        );
    },
    "InsertInvitado" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "INSERT INTO `fiestas`.`invitados` (`nombre`, `correo`, `telefono`, `tipo`, `ultimoCef`) VALUES ($nombre, $correo, $telefono, '1', $cef);";
        $response["OK"] = executeUpdate(
            $sql,
            $connection
        );
        $sql = "SELECT id FROM fiestas.invitados WHERE nombre = $nombre AND telefono = $telefono AND correo = $correo";
        $invitado =  executeQuery($sql,$connection);
        $response['invitado'] = $invitado[0]['id'];
    },
    "InsertFiesta" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "INSERT INTO `fiestas`.`fiesta` (`invitados`, `costo`, `state`, `cef_id`, `invitados_id`,`tiposFiestas_id`) VALUES ($invitados, $costo,1, $cef, $invitado, 1);";
        $response["OK"] = executeUpdate(
            $sql,
            $connection
        );
        $sql = "SELECT MAX(id) as id FROM fiestas.fiesta ";
        $invitado =  executeQuery($sql,$connection);
        $response['folio'] = $invitado[0]['id'];
    },
    "SelectInvitadoWTS" => function () use ($connection, &$response) {
        extract($_POST);
        $sql = "SELECT * FROM fiestas.invitados WHERE telefono = $wts";
        $invitado =  executeQuery($sql,$connection);
        $response['invitado'] = $invitado[0];
    },
    "InsertContenido" => function () use ($connection, &$response) {
        extract($_POST);
        $contenido = $_POST['contenido'];
         $sql = "DELETE FROM `fiestas`.`contenido` WHERE (`fiesta_id` = $fiesta);";
        $response['OK'] = executeUpdate($sql, $connection);
        $sql = "INSERT INTO `fiestas`.`contenido` (`codigo`, `cantidad`, `precio`, `categoria`, `fiesta_id`) VALUES $contenido;";
        if($response['OK']) $response["OK"] = executeUpdate($sql, $connection);
        else $response['OK'] = false;
        // $invitado =  executeQuery($sql,$connection);
        // $response['invitado'] = $invitado[0];
    },
    "SelectCotizador" => function () use ($connection, &$response) {
        extract($_POST);
        $cotizacionReturn = array(
        "folio" => $cotizacion,
        "invitado" => array(),
        "extras" => array(),
        "paquetes" => array(
            "comida" => array(),
            "bebida" => array()
        ),
        "fiesta" => array(),
        "invitadosExtras" => array(),
        );

        //Consulta de la cotizacion 
        $sql = "SELECT * FROM fiestas.fiesta WHERE id = $cotizacion ;";
        $fiesta = executeQuery($sql,$connection);
        $fiesta = $fiesta[0];
        $response['return'] =$fiesta; 
        $cotizacionReturn["inFiesta"] = array(
            "festejados" => null,
            "festejado1" => null,
            "festejado2" => null,
            "tipoFiesta" => $fiesta['tiposFiestas_id'],
            "invitados" =>  $fiesta['invitados'],
            "precioPaquete" => $fiesta['costo'],
            "pastel" => null, // Agregar a la tabla fiestas
        );

        //Consulta del invitado.
        $sql = "SELECT * FROM fiestas.invitados WHERE id = ".$fiesta['invitados_id']." ;";
        $invitado = executeQuery($sql,$connection);
        $invitado = $invitado[0];  
        $cotizacionReturn['invitado'] = $invitado;

        //paquetes de fiestas
        $sql = "SELECT descripcion, codigo, 0 as cantidad, 0 as precio FROM fiestas.contenido_tiposFiestas WHERE tiposFiestas_id IN(".$fiesta['tiposFiestas_id'].",0);";
        $incluidos = executeQuery($sql,$connection);  
        $cotizacionReturn['fiesta'] = $incluidos;


        //Consulta paquetes -comida-


        //Consulta paquetes -bebida- 
        

        $response['cotizacion'] = $cotizacionReturn;
        // $invitado =  executeQuery($sql,$connection);
        // $response['invitado'] = $invitado[0];
    },
    "SelectSalonesCef" => function () use ($connection, &$response){
        extract($_POST);
        $sql = "SELECT * FROM fiestas.salones WHERE cef_id = $cef order by codigo ASC;"; 
        $response['salones'] = executeQuery($sql,$connection);
        foreach ($response['salones'] as $key => $value) {
            $response['salones'][$key]['games'] = $value['games'] == 1 ? "Si" : "No" ;
            $response['salones'][$key]['ice'] = $value['ice']  == 1 ? "Si" : "No" ;
            $response['salones'][$key]['bown'] = $value['bown']  == 1 ? "Si" : "No" ;
            $response['salones'][$key]['kids'] = $value['kids']  == 1 ? "Si" : "No" ;
        }
    },
    "InsertSalon" => function () use ($connection, &$response){
        extract($_POST);
        $sql = "INSERT INTO `fiestas`.`salones` (`codigo`, `cef_id`, `games`, `kids`, `bown`, `ice`) VALUES ($codigo, $cef, $games, $kids, $bown, $ice);"; 
        $response['OK'] = executeUpdate($sql,$connection);
    },
    "UpdateSalon" => function () use ($connection, &$response){
        extract($_POST);
        $sql = "UPDATE fiestas.salones SET games = $games, kids = $kids, bown = $bown, ice = $ice WHERE id = $id" ;
        $response['OK'] = executeUpdate($sql,$connection);
    },"InsertProducto" => function () use ($connection, &$response){
        extract($_POST); 
        $sql = "CALL fiestas.addproducto($codigo,$producto,$precio);" ;
        $response['OK'] = executeUpdate($sql,$connection);
    },"SelectProductos" => function () use ($connection, &$response){
        extract($_POST); 
        $sql = "SELECT * FROM fiestas.productos;" ;
        $response['productos'] = executeQuery($sql,$connection);
    },"SelectProductosExtras" => function () use ($connection, &$response){
        extract($_POST); 
        $sql = "SELECT CONCAT('$',precio,' - ',codigo,' ',producto) FROM fiestas.productos;" ;
        $response['productos'] = executeQuery($sql,$connection);
    }
// 
];
function executeQuery($sql, $connection)
{
    $querry = mysql_query($sql, $connection);
    $data = [];
    while ($row = mysql_fetch_assoc($querry)) {
        $data[] = $row;
    }
    return $data;
}
function executeUpdate($sql, $connection)
{
    //retorna si se el query fue ejecutado
    $resultado = mysql_query($sql, $connection);
    return $resultado == 1 ? true : false;
}
if (isset($queryFunctions[$_POST["optionService"]])) {
    $queryFunctions[$_POST["optionService"]]();
}
$json_response = json_encode($response, JSON_UNESCAPED_UNICODE);
echo $json_response;
?>
