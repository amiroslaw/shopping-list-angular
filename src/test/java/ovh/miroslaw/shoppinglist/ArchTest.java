package ovh.miroslaw.shoppinglist;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ovh.miroslaw.shoppinglist");

        noClasses()
            .that()
            .resideInAnyPackage("ovh.miroslaw.shoppinglist.service..")
            .or()
            .resideInAnyPackage("ovh.miroslaw.shoppinglist.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..ovh.miroslaw.shoppinglist.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
