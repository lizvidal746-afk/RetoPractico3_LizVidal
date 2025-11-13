Feature: Pruebas de API DummyJSON

  Scenario: Autenticación exitosa con credenciales válidas
    Given que estoy usando la API de DummyJSON
    When realizo un POST a /auth/login con credenciales válidas
    Then el status code debe ser 200
    And la respuesta debe contener un token válido
    And el ID del usuario debe estar presente

  Scenario: Fallo de autenticación con credenciales inválidas
    Given que estoy usando la API de DummyJSON
    When realizo un POST a /auth/login con credenciales inválidas
    Then el status code debe ser 400 o 401
    And debe aparecer un mensaje de error

  Scenario: Obtener lista de usuarios autenticado
    Given que estoy usando la API de DummyJSON
    And me he autenticado exitosamente
    When realizo un GET a /users
    Then el status code debe ser 200
    And la respuesta debe contener un array de usuarios
    And cada usuario debe tener las propiedades requeridas

  Scenario: Obtener usuario específico con token
    Given que estoy usando la API de DummyJSON
    And me he autenticado exitosamente
    When realizo un GET a /users/{id} con token
    Then el status code debe ser 200
    And la respuesta debe contener los datos del usuario

  Scenario: Obtener productos con paginación
    Given que estoy usando la API de DummyJSON
    When realizo un GET a /products con paginación
    Then el status code debe ser 200
    And la respuesta debe contener un array de productos
    And cada producto debe tener precio y stock
