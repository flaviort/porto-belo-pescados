<?php
	$current_page = 'home';
	$page_title = 'Home';
	include('components/head.php');
?>

<div class='bg-video'>

	<div class='overlay'></div>

	<video class='desk cover' autoplay playsinline muted loop preload='none'>
		<source src='assets/videos/bg-desk.mp4'>
	</video>

	<video class='mob cover' autoplay playsinline muted loop preload='none'>
		<source src='assets/videos/bg-mob.mp4'>
	</video>

</div>

<section id='banner'>
	<div class='container'>
		<div class='flex'>

			<h1 class='text-biggest'>
				Frescor do Mar, <br />
				Sabor na Sua Mesa
			</h1>

			<div class='scroll'>
				<div></div>
			</div>

		</div>
	</div>
</section>

<section id='quem-somos'>
	<div class='container'>
		<div class='flex'>

			<h2 class='text-biggest reveal-text bold'>
				Quem Somos
			</h2>

			<p>
				Somos uma empresa brasileira, especializada na compra, processamento e comercialização de pescados. 

				Mergulhamos no frescor dos mares para trazer até você peixes saborosos e saudáveis. Desde as águas até sua mesa, nossos produtos são selecionados com cuidado, garantindo qualidade e satisfação em cada mordida. 
			</p>

			<h3 class='text-medium-big'>
				<strong>
					Desfrute do sabor do mar com a Porto Belo Pescados!
				</strong>
			</h3>

			<a href="#produtos" class='magnetic sliding-link' data-strength='100'>
				Nossos Produtos
			</a>

		</div>
	</div>
</section>

<section id='produtos' class='padding-y'>
	<div class='container'>

		<div class='top'>

			<h2 class='text-biggest fill-title bold'>
				Produtos
			</h2>

			<div class='products-navigation'></div>

		</div>

		<div class='products-slider swiper-container'>

			<button class='product-nav prev magnetic' data-strength='100'>
				<?= file_get_contents('assets/svg/ux/arrow-left.svg'); ?>
			</button>

			<button class='product-nav next magnetic' data-strength='100'>
				<?= file_get_contents('assets/svg/ux/arrow-right.svg'); ?>
			</button>

			<div class='swiper-wrapper'>

				<?php $products = include('components/products.php'); ?>

				<?php foreach ($products as $item): ?>
					<div class='swiper-slide' data-title='<?= $item['title'] ?>'>

						<div class='top'>

							<div class='image magnetic' data-strength='50'>

								<img src='<?= $item['image'] ?>' alt='<?= $item['title'] ?>' class='magnetic' data-strength='100'>
						
								<div class='bg'>
									<div class='inner'></div>
								</div>

							</div>

							<h2 class='text-big'>
								<strong>
									<?= $item['title'] ?>
								</strong>
							</h2>

							<p>
								<?= $item['sub_title'] ?>
							</p>

						</div>

						<div class='bottom'>
							<?php foreach ($item['details'] as $detail): ?>
								<div class='icon'>

									<?= file_get_contents($detail['icon']); ?>

									<p>
										<?= $detail['description'] ?>
									</p>

								</div>
							<?php endforeach; ?>
						</div>
						
					</div>
				<?php endforeach; ?>

			</div>
		</div>

	</div>
</section>

<?php include('components/footer.php'); ?>