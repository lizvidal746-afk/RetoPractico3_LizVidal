Feature: Validación de flujo de compra en Sauce Demo

  Scenario: Camino feliz - Compra exitosa (Happy path)
    Given que el usuario está en la página de login de Sauce Demo
    When el usuario inicia sesión con credenciales válidas
    And el usuario agrega un producto al carrito
    And el usuario procede al checkout
    Then la compra debe completarse exitosamente

  Scenario: Validación negativa - Login fallido
    Given que el usuario está en la página de login de Sauce Demo
    When el usuario intenta iniciar sesión con credenciales inválidas
    Then debe aparecer un mensaje de error

  Scenario: Validación de carrito persistente
    Given que el usuario está en la página de login de Sauce Demo
    When el usuario inicia sesión con credenciales válidas
    And el usuario agrega un producto al carrito
    And el usuario hace logout
    And el usuario vuelve a iniciar sesión con credenciales válidas
    Then el carrito debe estar vacío en la nueva sesión
