<?php
	$current_page = 'home';
	$page_title = 'Home';
	include('components/head.php');
?>

<section id='banner' class='bg-black' data-scroll-section>

	<video autoplay playsinline muted loop class='lazy' preload='none' data-scroll data-scroll-speed='-3' data-scroll-position='top'>
		<source data-src='assets/videos/professor.mp4'>
	</video>

	<div class='side blue transitionUp'>
		<?php echo file_get_contents('assets/svg/curve-bottom-right.svg'); ?>
	</div>

	<div class='container white transitionUp' data-scroll data-scroll-speed='3' data-scroll-position='top'>

		<h1 class='text-biggest text-plane'>
			Na Prática <br />
			a teoria <br />
			é outra
		</h1>

		<p class='text-medium desc'>
			Preparamos sua empresa para venda ou sucessão através de governança ágil.
		</p>

		<a href='<?php echo($diagnostico); ?>' class='rotating-button white magnetic' data-strength='100'>

			<div class='rotating-text'>
				<div class='inner-text'>
					<?php echo file_get_contents('assets/svg/circle-text-1.svg'); ?>
				</div>
			</div>

			<div class='circle'>
				<?php echo file_get_contents('assets/svg/ux/arrow-right.svg'); ?>
				<?php echo file_get_contents('assets/svg/ux/arrow-right.svg'); ?>
			</div>

		</a>

	</div>

</section>

<section id='produtos' class='' data-scroll-section>
	<div class='container'>

		<div class='top'>

			<h2 class='text-big reveal-text fill-title'>
				Produtos
			</h2>

			<div class='products-navigation'></div>

		</div>

		<div class='products-slider swiper-container'>

			<button class='product-nav prev'>
				<?= file_get_contents('assets/svg/ux/arrow-left.svg'); ?>
			</button>

			<button class='product-nav next'>
				<?= file_get_contents('assets/svg/ux/arrow-right.svg'); ?>
			</button>

			<div class='swiper-wrapper'>

				<?php $products = include('components/products.php'); ?>

				<?php foreach ($products as $item): ?>
					<div class='swiper-slide' data-title='<?= $item['title'] ?>'>

						<div class='top'>

							<div class='image'>

								<img src='<?= $item['image'] ?>' alt='<?= $item['title'] ?>'>
						
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