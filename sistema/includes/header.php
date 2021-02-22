<?php
session_start();
if (empty($_SESSION['active'])) {
	header('location: ../');
}
include "includes/functions.php";
include "../conexion.php";
// datos Empresa
$dni = '';
$nombre_empresa = '';
$razonSocial = '';
$emailEmpresa = '';
$telEmpresa = '';
$dirEmpresa = '';
$igv = '';

$query_empresa = mysqli_query($conexion, "SELECT * FROM configuracion");
$row_empresa = mysqli_num_rows($query_empresa);
if ($row_empresa > 0) {
	if ($infoEmpresa = mysqli_fetch_assoc($query_empresa)) {
		$dni = $infoEmpresa['dni'];
		$nombre_empresa = $infoEmpresa['nombre'];
		$razonSocial = $infoEmpresa['razon_social'];
		$telEmpresa = $infoEmpresa['telefono'];
		$emailEmpresa = $infoEmpresa['email'];
		$dirEmpresa = $infoEmpresa['direccion'];
		$igv = $infoEmpresa['igv'];
	}
}
$query_data = mysqli_query($conexion, "CALL data();");
$result_data = mysqli_num_rows($query_data);
if ($result_data > 0) {
	$data = mysqli_fetch_assoc($query_data);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Punto de Venta</title>

	<!-- Custom styles for this template-->
	<link href="css/sb-admin-2.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/dataTables.bootstrap4.min.css">

</head>

<body id="page-top">
	<?php
	include "../conexion.php";
	$query_data = mysqli_query($conexion, "CALL data();");
	$result_data = mysqli_num_rows($query_data);
	if ($result_data > 0) {
		$data = mysqli_fetch_assoc($query_data);
	}

	?>
	<!-- Page Wrapper -->
	<div id="wrapper">

		<?php include_once "includes/menu.php"; ?>
		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">
				<!-- Topbar -->
				<nav class="navbar navbar-expand navbar-light bg-primary text-white topbar mb-4 static-top shadow">

					<!-- Sidebar Toggle (Topbar) -->
					<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
						<i class="fa fa-bars"></i>
					</button>
					<div class="input-group">
						<h6>Sistema de Venta</h6>
						<p class="ml-auto"><strong>Peru, </strong><?php echo fechaPeru(); ?></p>
					</div>

					<!-- Topbar Navbar -->
					<ul class="navbar-nav ml-auto">

						<div class="topbar-divider d-none d-sm-block"></div>

						<!-- Nav Item - User Information -->
						<li class="nav-item dropdown no-arrow">
							<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span class="mr-2 d-none d-lg-inline small text-white"><?php echo $_SESSION['nombre']; ?></span>
							</a>
							<!-- Dropdown - User Information -->
							<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
								<a class="dropdown-item" href="#">
									<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
									<?php echo $_SESSION['email']; ?>
								</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="salir.php">
									<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
									Salir
								</a>
							</div>
						</li>

					</ul>

				</nav>
