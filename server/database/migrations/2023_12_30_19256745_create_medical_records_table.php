<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctor_id');
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
            $table->unsignedBigInteger('patient_id');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->unsignedBigInteger('medicalHistory_id');
            $table->foreign('medicalHistory_id')->references('id')->on('medical_histories')->onDelete('cascade');
            $table->unsignedBigInteger('medicationHistory_id');
            $table->foreign('medicationHistory_id')->references('id')->on('medication_histories')->onDelete('cascade');
            $table->unsignedBigInteger('labResults_id');
            $table->foreign('labResults_id')->references('id')->on('lab_results')->onDelete('cascade');
            $table->unsignedBigInteger('symptom_id');
            $table->foreign('symptom_id')->references('id')->on('symptoms')->onDelete('cascade');
            $table->unsignedBigInteger('prescription_id');
            $table->foreign('prescription_id')->references('id')->on('prescriptions')->onDelete('cascade');
            $table->unsignedBigInteger('diagnosis_id');
            $table->foreign('diagnosis_id')->references('id')->on('diagnoses')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
