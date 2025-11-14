Feature: Pruebas de API DummyJSON

  Scenario: Autenticacion exitosa con credenciales validas
    Given que estoy usando la API de DummyJSON
    When realizo un POST al endpoint auth login con credenciales validas
    Then el status code debe ser 200
    And la respuesta debe contener un token valido
    And el ID del usuario debe estar presente

  Scenario: Fallo de autenticacion con credenciales invalidas
    Given que estoy usando la API de DummyJSON
    When realizo un POST al endpoint auth login con credenciales invalidas
    Then el status code debe ser 400 o 401
    And el mensaje de error debe estar presente en la respuesta

  Scenario: Obtener lista de usuarios autenticado
    Given que estoy usando la API de DummyJSON
    And me he autenticado exitosamente
    When realizo un GET al endpoint users
    Then el status code debe ser 200
    And la respuesta debe contener un array de usuarios
    And cada usuario debe tener las propiedades requeridas

  Scenario: Obtener usuario especifico con token
    Given que estoy usando la API de DummyJSON
    And me he autenticado exitosamente
    When realizo un GET al endpoint users con id
    Then el status code debe ser 200
    And la respuesta debe contener los datos del usuario

  Scenario: Obtener productos con paginacion
    Given que estoy usando la API de DummyJSON
    When realizo un GET al endpoint products con paginacion
    Then el status code debe ser 200
    And la respuesta debe contener un array de productos
    And cada producto debe tener precio y stock
