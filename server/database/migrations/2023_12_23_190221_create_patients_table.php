<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('patients', function (Blueprint $table) {
        $table->id();
        $table->string('first_name');
        $table->string('last_name');
        $table->integer('age'); 
        $table->string('gender'); 
        $table->bigInteger('phone_number')->unique()->nullable(); 
        $table->text('address')->nullable(); 
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('insurance_company_id')->nullable()->constrained('insurance_companies')->onDelete('set null');
        $table->softDeletes();
        $table->timestamps(); 
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
