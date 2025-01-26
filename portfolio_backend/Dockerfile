# Use the official OpenJDK image to build the app
FROM openjdk:17-jdk-slim AS build

# Set the working directory in the container
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy the pom.xml and download dependencies (faster build)
COPY pom.xml .

# Download Maven dependencies offline
RUN mvn dependency:go-offline

# Copy the entire project to the container
COPY src ./src

# Package the application (this step will create the JAR file)
RUN mvn clean package -DskipTests

# Start a new image with only the runtime dependencies
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage
# Ensure the JAR is copied correctly
COPY --from=build /app/target/portfolio_backend-0.0.1-SNAPSHOT.jar /app/portfolio_backend-0.0.1-SNAPSHOT.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "portfolio_backend-0.0.1-SNAPSHOT.jar"]
