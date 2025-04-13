describe('Application under test:https://magento.softwaretestingboard.com/', function () {

    it('should check the message and logo at the top of the screen', function () {
        cy.clearCookies()
        cy.visit('https://magento.softwaretestingboard.com/').wait(500)
        cy.get('[class = "message global demo"]').find('p').should('have.text', 'This is a demo store to test your test automaiton scripts. ' +
            'No orders will be fulfilled. If you are facing any issue, email us at hello@softwaretestingboard.com.')
        cy.get('img').should('have.attr', 'src').and('include',
            'https://magento.softwaretestingboard.com/pub/static/version1695896754/frontend/Magento/luma/en_US/images/logo.svg')
    });

    it('should go to Men - Tops - Jackets', () => {
        cy.get('span').contains('Men').trigger('mouseover').wait(1000)
        cy.get('span').contains('Men').parents('a').siblings('ul').find('span')
            .contains('Tops').trigger('mouseover')
        cy.get('span').contains('Men').parents('a').siblings('ul').find('ul')
            .find('span').contains('Jackets').click().wait(2000)
    });

    it('should check the characteristics of the first item and add it to the cart', () => {
        cy.get('.product-item-details').find('.product-item-name').first().should('contain.text', 'Proteus Fitness Jackshirt').click().wait(2000)
        cy.get('.reviews-actions').should('contain.text', 'Be the first to review this product')
        cy.get('.price-container').should('contain.text', 'As low as').and('contain.text', '$45.00')
        cy.get('#option-label-size-143-item-166').contains('XS').should('be.visible')
        cy.get('#option-label-size-143-item-167').contains('S').should('be.visible')
        cy.get('#option-label-size-143-item-168').contains('M').should('be.visible')
        cy.get('#option-label-size-143-item-169').contains('L').should('be.visible')
        cy.get('#option-label-size-143-item-170').contains('XL').should('be.visible')
        cy.get('div').contains('XXL').should('not.exist')
        cy.get('#option-label-color-93-item-49').should('have.attr', 'option-tooltip-value', '#000000')
        cy.get('#option-label-color-93-item-50').should('have.attr', 'option-tooltip-value', '#1857f7')
        cy.get('#option-label-color-93-item-56').should('have.attr', 'option-tooltip-value', '#eb6703')
        cy.get('#option-label-size-143-item-168').contains('M').click()
        cy.get('#option-label-color-93-item-50').should('have.attr', 'option-tooltip-value', '#1857f7').click()
        cy.get('#product-addtocart-button').click().find('span').should('have.text', 'Added')
    });

    it('should search for another item and add it to the cart', () => {
        cy.get('#search').type('Montana Wind Jacket').type('{enter}')
        cy.get('.product-item-details').find('.product-item-name').first().should('contain.text', 'Montana Wind Jacket').click().wait(2000)
        cy.get('#option-label-size-143-item-169').contains('L').click()
        cy.get('#option-label-color-93-item-53').should('have.attr', 'option-tooltip-value', '#53a828').click()
        cy.get('#product-addtocart-button').click().find('span').should('have.text', 'Added')
    });

    it('should check the cart and checkout', () => {
        cy.get('.showcart').click()
        cy.get('.minicart-items-wrapper').find('.product-item').should('have.length', 2)
        cy.get('#top-cart-btn-checkout').should('have.text', 'Proceed to Checkout').click()
    });
});