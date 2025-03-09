<?php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
    'allowed_origins' => ['http://localhost:3000'], // Replace with your frontend domain
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'allowed_credentials' => true,

];
