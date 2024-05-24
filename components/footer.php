                <section id='contato' class='footer' data-scroll-section>
                    <div class='footer-wrapper' data-scroll data-scroll-speed='-4' data-scroll-position='bottom'>

                        <div class='fishes'>
                            <span data-scroll data-scroll-speed='2' data-scroll-position='bottom'>
                                <?= file_get_contents('assets/svg/other/fishes.svg'); ?>
                            </span>
                        </div>

                        <div class='container'>

                            <div class='top'>

                                <a href='./' class='logo magnetic' data-strength='50'>
                                    <?= file_get_contents('assets/svg/logo/logo-vertical.svg'); ?>
                                </a>

                                <ul class='right'>

                                    <?php
                                        $contact_data = [
                                            [
                                                'title' => 'SAC',
                                                'email' => $sac_email,
                                                'phone' => $sac_phone,
                                            ],
                                            [
                                                'title' => 'Compras',
                                                'email' => $compras_email,
                                                'phone' => $compras_phone,
                                            ],
                                            [
                                                'title' => 'Financeiro',
                                                'email' => $financeiro_email,
                                                'phone' => $financeiro_phone,
                                            ],
                                            [
                                                'title' => 'Comercial',
                                                'email' => $comercial_email,
                                                'phone' => $comercial_phone,
                                            ]
                                        ];
                                    ?>

                                    <?php foreach ($contact_data as $item): ?>
                                        <li>

                                            <p class='text-medium-big'>
                                                <?= $item['title'] ?>
                                            </p>

                                            <a href='mailto:<?= $item['email'] ?>' class='hover-underline email'>
                                                <?= $item['email'] ?>
                                            </a>

                                            <a href='tel:<?= $item['phone'] ?>' class='phone text-medium bold hover-underline email'>
                                                <?= $item['phone'] ?>
                                            </a>

                                        </li>
                                    <?php endforeach; ?>

                                </ul>

                            </div>

                            <div class='bottom'>

                                <p>
                                    <?= $address ?>
                                </p>

                            </div>

                        </div>
                    </div>
                </section>

            </div><!-- end data-scroll-container -->
        </main>

        <footer>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js'></script>
            <script src='assets/js/vendor/split-text.min.js'></script>
            <script src='assets/js/functions.min.js' defer></script>

        </footer>

	</body>
</html>